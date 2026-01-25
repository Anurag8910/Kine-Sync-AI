import React from "react";

const MacroProgressBar = ({ label, consumed, goal, color }) => {
    
    // 🎯 CRITICAL FIX: Ensure the percentage stops at 100%
    const rawPercentage = (consumed / goal) * 100;
    
    // Use Math.min to cap the percentage at 100
    const displayPercentage = Math.min(rawPercentage, 100);

    return (
        <div>
            {/* ... label and text here ... */}
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                {/* Apply the capped displayPercentage to the width style */}
                <div 
                    className={`h-full rounded-full ${color}`}
                    style={{ width: `${displayPercentage}%` }} // <--- FIX IS APPLIED HERE
                ></div>
            </div>
            
            {/* Display consumed/goal text (e.g., 300g / 220g) */}
            <p className="text-xs text-white mt-1">
                {consumed}g / {goal}g
                {/* Optional: Add a subtle text warning if over the goal */}
                {rawPercentage > 100 && (
                    <span className="text-red-500 ml-2"> (Goal Exceeded!)</span>
                )}
            </p>
        </div>
    );
};

export default MacroProgressBar