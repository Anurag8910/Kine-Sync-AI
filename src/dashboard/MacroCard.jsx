import React from "react";
import MacroProgressBar from "./MacroProgessBar";

const MacroCard = () => {
    const macrosData = [
        {label : 'Carbs', consumed : 180 , goal:220, color:'bg-blue-500'},
        {label : 'Protein', consumed : 85 , goal:120, color:'bg-red-500'},
        {label : 'Fat', consumed : 65 , goal:80, color:'bg-yellow-500'},
    ];

    return(
        <div className="bg-[#161B22] p-5 rounded-xl border border-gray-800">
            <h2 className="text-lg font-semibold text-white mb-4">Macros for Today </h2>
            <div className = 'space-y-4'>
                {macrosData.map((macro) => (
                    <MacroProgressBar 
                    key = {macro.label}
                    label={macro.label}
                    consumed={macro.consumed}
                    goal={macro.goal}
                    color={macro.color}
                    />
                ))}
            </div>
        </div>
    );
};

export default MacroCard;