import React, { useState } from "react";
import { Play,Info,Video } from "lucide-react";
import PoseDetector from "../model/PoseDetector";

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
    }
];

const ExerciseCard = ({ exercise, onStart, onInfo }) => {
  return (
    // Changed: bg-white -> bg-slate-900, added border-slate-800
    <div className="bg-slate-900 rounded-xl shadow-lg hover:shadow-blue-900/20 transition-all duration-300 overflow-hidden border border-slate-800 flex flex-col group">
      
      {/* Image Section (Made Larger as requested previously: h-64) */}
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
        {/* Changed: Text colors to white/slate-400 */}
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
            // Changed: Outline button styled for dark mode
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
// 4. MAIN PAGE COMPONENT (Dark Theme)
// ==========================================
const ExerciseDashboard = () => {

  const[activeExercise,setActiveExercise] = useState(null);

  if(activeExercise) {
    return <PoseDetector
    exerciseId={activeExercise}
     onExit={() => setActiveExercise(null)}/>;
  }

  const handleStart = (id) => {
    if(['bicep_curls','squats','pushups'].includes(id)) {
      setActiveExercise(id);
    }else {
      alert("Logic for this ecercise is coming soon!");
    }
  };

  const handleInfo = (id) => {
    alert(`Show instructions modal for ${id}`);
  };

  return (
    // Changed: bg-slate-50 -> bg-slate-950 (The dark background)
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          {/* Changed: text-gray-900 -> text-white */}
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            AI Form Correction
          </h1>
          {/* Changed: text-gray-600 -> text-slate-400 */}
          <p className="mt-2 text-lg text-slate-400">
            Select an exercise below to begin real-time analysis and feedback.
          </p>
        </div>

        {/* The Grid (Kept wide: lg:grid-cols-2) */}
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
    </div>
  );
};

export default ExerciseDashboard