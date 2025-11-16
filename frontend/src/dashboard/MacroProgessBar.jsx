import React from "react";

const MacroProgressBar = ({label,consumed,goal,color}) => {
    const percentage = goal > 0 ? (consumed / goal) * 100 : 0;
    return(
        <div className="w-full">
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-300">{label}</span>
                <span className="text-sm font-medium text-gray-400">
                    {consumed}g / {goal}g
                </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                className={`${color} h-2 rounded-full`}
                style={{width: `${percentage}%`}}
                >

                </div>
            </div>
        </div>
    );
};

export default MacroProgressBar