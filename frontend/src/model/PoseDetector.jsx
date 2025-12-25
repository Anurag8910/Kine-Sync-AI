import React, { useEffect, useRef, useState } from "react";
import { Pose } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { POSE_CONNECTIONS } from "@mediapipe/pose";
import { calculateAngle, EXERCISE_RULES } from "./exerciseConfig";

const PoseDetector = ({ exerciseId, onExit }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // State
  const [counter, setCounter] = useState(0);
  const [stage, setStage] = useState("start");
  const [feedback, setFeedback] = useState("Position yourself");

  // Refs for loop logic
  const counterRef = useRef(0);
  const stageRef = useRef("start");

  // Load the rules for the selected exercise
  const config = EXERCISE_RULES[exerciseId];

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults((results) => {
      const canvasElement = canvasRef.current;
      const ctx = canvasElement.getContext("2d");

      // 1. CLEAR & DRAW CAMERA IMAGE (Do this once, at the start)
      ctx.save(); // Save default state
      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      ctx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      // 2. DETECT & DRAW LANDMARKS
      if (results.poseLandmarks) {
        const landmarks = results.poseLandmarks;
        const [p1, p2, p3] = config.joints.map((idx) => landmarks[idx]);
        const angle = calculateAngle(p1, p2, p3);

        // --- COUNTING LOGIC ---
        if (config.countType === "flexion") {
          if (angle > config.range.max) {
            stageRef.current = "down";
            setStage("down");
          }
          if (angle < config.range.min && stageRef.current === "down") {
            stageRef.current = "up";
            setStage("up");
            counterRef.current += 1;
            setCounter(counterRef.current);
          }
        } else if (config.countType === "extension") {
          if (angle < config.range.min) {
            stageRef.current = "down";
            setStage("down");
          }
          if (angle > config.range.max && stageRef.current === "down") {
            stageRef.current = "up";
            setStage("up");
            counterRef.current += 1;
            setCounter(counterRef.current);
          }
        }

        // --- FORM CHECK ---
        const formStatus = config.checkForm(landmarks);
        setFeedback(formStatus);

        // --- DRAW SKELETON ---
        // (No need to clearRect again here, just draw on top)
        
        // Draw Angle Text
        ctx.fillStyle = "yellow";
        ctx.font = "30px Arial";
        ctx.fillText(
          `Angle: ${Math.round(angle)}`,
          p2.x * canvasElement.width,
          p2.y * canvasElement.height
        );

        // Draw Connectors and Landmarks
        drawConnectors(ctx, landmarks, POSE_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 4,
        });
        drawLandmarks(ctx, landmarks, { color: "#FF0000", lineWidth: 2 });
      }
      
      ctx.restore(); // Restore state (Matches the single save at the top)
    });

    let camera = null;

    if (videoRef.current) {
      camera = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current) await pose.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }

    return () => {
      console.log("Cleaning up Pose and Camera...");
      if (camera) {
        camera.stop();
      }
      pose.close();
    };
  }, [config]);

  return (
    <div className="flex flex-col items-center bg-slate-950 min-h-screen p-6">
      <h2 className="text-3xl font-bold text-white mb-4">{config.name}</h2>

      <div className="grid grid-cols-3 gap-6 bg-slate-900 p-6 rounded-2xl border border-slate-800 mb-6 w-full max-w-2xl">
        <div className="text-center">
          <p className="text-slate-500 text-xs font-bold uppercase">Reps</p>
          <p className="text-4xl font-black text-white">{counter}</p>
        </div>
        <div className="text-center border-x border-slate-800">
          <p className="text-slate-500 text-xs font-bold uppercase">Stage</p>
          <p className="text-2xl font-bold text-blue-500">
            {stage.toUpperCase()}
          </p>
        </div>
        <div className="text-center">
          <p className="text-slate-500 text-xs font-bold uppercase">Form</p>
          <p className="text-sm font-medium text-green-400">{feedback}</p>
        </div>
      </div>

      <div className="relative rounded-3xl overflow-hidden border-8 border-slate-900 shadow-2xl">
        <video
          ref={videoRef}
          className="absolute opacity-0 pointer-events-none"
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          className="w-full h-auto max-w-2xl bg-slate-900 rounded-2xl"
        />
      </div>

      <button
        onClick={onExit}
        className="mt-8 bg-slate-800 hover:bg-red-600 text-white px-10 py-3 rounded-full transition-all font-bold"
      >
        Finish Workout
      </button>
    </div>
  );
};

export default PoseDetector;