import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// 1. IMPORTED 'X' ICON
import { Play, Info, Video, X } from "lucide-react";
import PoseDetector from "../model/PoseDetector";
// 2. IMPORT EXERCISE_RULES TO GET THE INSTRUCTIONS
import { EXERCISE_RULES } from "../model/exerciseConfig";
import { UserContext } from "../pages/UserContext"; 

//To add  new exersise, just copy one {block} and paste it here
const EXERCISES = [
    {
        id:'squats',
        title: 'Squats',
        description: 'Focus on form and depth',
        image: '/assets/Squats.jpg'
    },
    {
        id:'pushups',
        title: 'Push Ups',
        description: 'Engage your core muscles',
        image: '/assets/pushUps.jpg'
    },
    {
        id:'plank',
        title: 'Plank',
        description: 'Keep your back straight',
        image: '/assets/plank.jpg'
    },
    {
        id:'bicep_curls',
        title: 'Bicep Curls',
        description: 'Biceps fully contracted',
        image: '/assets/biceps-curls.jpg'
    },
    {
        id:'lunges',
        title: 'Stationary Lunges',
        description: 'Knee almost touches floor',
        image: '/assets/Lunges.jpg'
    },
    {
        id:'glute_bridge',
        title: 'Glute Bridge',
        description: 'Focus on hip extension',
        image: '/assets/GluteBridge.webp'
    },
    {
        id: 'situps',
        title: 'Sit Ups',
        description: 'Core strength and stability',
        image: '/assets/Situps.jpg' 
    },
    {
        id: 'shoulder_press',
        title: 'Shoulder Press',
        description: 'Vertical push for shoulders',
        image: '/assets/ShoulderPress.jpg'
    }
];

const ExerciseCard = ({ exercise, onStart, onInfo }) => {
  return (
    <div className="bg-slate-900 rounded-xl shadow-lg hover:shadow-blue-900/20 transition-all duration-300 overflow-hidden border border-slate-800 flex flex-col group">
      
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden bg-slate-800">
        <img 
          src={exercise.image} 
          alt={exercise.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-3 right-3 bg-black/60 text-white p-1.5 rounded-md backdrop-blur-sm border border-white/10">
          <Video size={16} />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-1">{exercise.title}</h3>
        <p className="text-slate-400 text-sm mb-6">{exercise.description}</p>
        
        {/* Buttons */}
        <div className="mt-auto flex gap-3">
          <button 
            onClick={() => onStart(exercise.id)}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20"
          >
            <Play size={18} fill="currentColor" />
            Start
          </button>
          
          <button 
            onClick={() => onInfo(exercise.id)}
            className="flex-1 bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Info size={18} />
            Info
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
const ExerciseDashboard = () => {


  const [activeExercise, setActiveExercise] = useState(null);
  // 3. NEW STATE FOR MODAL ID
  const [infoModalId, setInfoModalId] = useState(null);
  const navigate = useNavigate();
  const { user, token } = useContext(UserContext);

  // Handle exercise completion - store in backend
  const handleExerciseComplete = async (exerciseData) => {
    if (token && exerciseData) {
      try {
        const response = await fetch('http://localhost:5000/api/logs/exercise', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            exerciseType: exerciseData.exerciseType,
            duration: exerciseData.duration,
            reps: exerciseData.reps,
          }),
        });
        const result = await response.json();
        if (result.success) {
          console.log('Exercise logged successfully:', result.data);
        }
      } catch (error) {
        console.error('Failed to log exercise:', error);
      }
    }
    // Return to exercise dashboard
    setActiveExercise(null);
  };

  if(activeExercise) {
    return <PoseDetector
    exerciseId={activeExercise}
    onExit={handleExerciseComplete}/>;
  }

  const handleStart = (id) => {
    if(['bicep_curls','squats','pushups','plank','lunges','glute_bridge','situps', 'shoulder_press'].includes(id)) {
      setActiveExercise(id);
    } else {
      alert("Logic for this exercise is coming soon!");
    }
  };

  const handleInfo = (id) => {
    // 4. REPLACED ALERT WITH SET STATE
    setInfoModalId(id);
  };

  // 5. GET CONFIG FOR THE OPEN MODAL
  const activeConfig = infoModalId ? EXERCISE_RULES[infoModalId] : null;

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              AI Form Correction
            </h1>
            <p className="mt-2 text-lg text-slate-400">
              Select an exercise below to begin real-time analysis and feedback.
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {EXERCISES.map((exercise) => (
            <ExerciseCard 
              key={exercise.id} 
              exercise={exercise} 
              onStart={handleStart}
              onInfo={handleInfo}
            />
          ))}
        </div>
      </div>

      {/* ========================================= */}
      {/* 6. INFO MODAL POPUP OVERLAY */}
      {/* ========================================= */}
      {activeConfig && (
        <div 
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setInfoModalId(null)} // Close when clicking outside
        >
          <div 
            className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
          >
            {/* CLOSE BUTTON */}
            <button 
                onClick={() => setInfoModalId(null)}
                className="absolute top-5 right-5 text-slate-500 hover:text-white bg-slate-800 p-1.5 rounded-full transition-colors"
            >
                <X size={20} />
            </button>

            {/* HEADER */}
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-950 p-3 rounded-xl border border-blue-800 text-blue-400">
                    <Info size={24}/>
                </div>
                <h3 className="text-3xl font-extrabold text-white">How to {activeConfig.name}</h3>
            </div>

            {/* IMAGE (If it exists in config) */}
            {activeConfig.info?.imageUrl && (
                <div className="border-4 border-slate-800 rounded-2xl overflow-hidden mb-6 bg-black">
                    <img 
                        src={activeConfig.info.imageUrl} 
                        alt={`${activeConfig.name} form guide`}
                        className="w-full h-auto object-contain"
                    />
                </div>
            )}

            {/* STEPS */}
            {activeConfig.info?.steps ? (
                <div className="space-y-4">
                    <h4 className="text-lg font-bold text-slate-300 uppercase tracking-wider">Key Steps</h4>
                    <ol className="space-y-3">
                        {activeConfig.info.steps.map((step, index) => (
                            <li key={index} className="flex items-start gap-4 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                                <span className="flex items-center justify-center bg-blue-500 text-white font-bold rounded-full w-7 h-7 mt-0.5 shrink-0 text-sm">
                                    {index + 1}
                                </span>
                                <p className="text-slate-200 leading-relaxed">{step}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-slate-400">Detailed instructions coming soon for this exercise!</p>
                </div>
            )}
            
            {/* START WORKOUT DIRECTLY FROM MODAL */}
            <div className="mt-8 flex gap-3">
              <button 
                  onClick={() => setInfoModalId(null)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-bold transition-colors"
              >
                  Close
              </button>
              <button 
                  onClick={() => {
                      setInfoModalId(null); // Close modal first
                      handleStart(activeConfig.id); // Then start the camera
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition-colors flex justify-center items-center gap-2"
              >
                  <Play size={20} fill="currentColor" /> Start Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ExerciseDashboard;