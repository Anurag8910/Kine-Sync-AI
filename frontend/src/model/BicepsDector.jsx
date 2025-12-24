import React, { useEffect, useRef, useState } from "react";
import { Pose } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { POSE_CONNECTIONS } from "@mediapipe/pose";
import { calculateAngle, EXERCISE_RULES } from "./exerciseConfig";

const BicepDetector = ({ onExit }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // State for Real-time UI
  const [counter, setCounter] = useState(0);
  const [stage, setStage] = useState("down");
  const [feedback, setFeedback] = useState("Position yourself");

  // Logic Refs (Crucial: prevents state lag during 30fps processing)
  const counterRef = useRef(0);
  const stageRef = useRef("down");

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
      if (!results.poseLandmarks) return;

      const landmarks = results.poseLandmarks;
      const canvasElement = canvasRef.current;
      const ctx = canvasElement.getContext("2d");
      const config = EXERCISE_RULES.bicep_curls;

      // 1. Get Points and Calculate Angle
      const [p1, p2, p3] = config.joints.map((idx) => landmarks[idx]);
      const angle = calculateAngle(p1, p2, p3);

      // 2. LOGIC FIX: Always use .current for logic checks
      if (angle > config.range.max) {
        if (stageRef.current !== "down") {
          console.log("State changed to: DOWN");
        }
        stageRef.current = "down";
        setStage("down"); // For UI display
      }

      if (angle < config.range.min && stageRef.current === "down") {
        stageRef.current = "up";
        setStage("up");
        counterRef.current += 1;
        setCounter(counterRef.current);
        console.log("Rep Counted! Total:", counterRef.current);
      }


      const formStatus = config.checkForm(landmarks);
      setFeedback(formStatus);

      // 3. Render
      ctx.save();
      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      ctx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      // DRAW THE ANGLE ON SCREEN (Helps you see if you are hitting the 30/160 marks)
      ctx.fillStyle = "yellow";
      ctx.font = "30px Arial";
      ctx.fillText(
        `Angle: ${Math.round(angle)}`,
        landmarks[13].x * canvasElement.width,
        landmarks[13].y * canvasElement.height
      );

      drawConnectors(ctx, landmarks, POSE_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 4,
      });
      drawLandmarks(ctx, landmarks, { color: "#FF0000", lineWidth: 2 });
      ctx.restore();
    });

    const camera = new cam.Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) {
          await pose.send({ image: videoRef.current });
        }
      },
      width: 640,
      height: 480,
    });
    camera.start();

    return () => camera.stop(); // Cleanup on exit
  }, []);

  return (
    <div className="flex flex-col items-center bg-slate-950 min-h-screen p-6">
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
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          className="w-full h-auto"
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

export default BicepDetector;
