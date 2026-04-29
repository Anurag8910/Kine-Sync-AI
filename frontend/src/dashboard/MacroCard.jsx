// import React, { useState } from "react";
// import MacroProgressBar from "./MacroProgessBar";
// import { useUser } from '../pages/UserContext'; // Adjust path if necessary
// import UpdateMacroForm from './UpdateMacroForm'; // We will create this component next

// const MacroCard = () => {
//     // 1. Get user data and the update function from Context
//     const { userData, getTodaysMacros, addDailyLog ,resetTodaysLogs} = useUser();
    
//     // Get current macro totals (assuming getTodaysMacros returns {carbs, protein, fat})
//     const { carbs, protein, fat } = getTodaysMacros();
    
//     // Get goals from profile/metrics (you might need to adjust this path)
//     const { 
//         targetCarbs = 220,  // Use a default if goal is not set yet
//         targetProtein = 120, 
//         targetFat = 80 
//     } = userData.metrics; 

//     // State to control the visibility of the input form
//     const [isFormOpen, setIsFormOpen] = useState(false);

//     // 2. Map the data using current consumed and goal values from Context
//     const macrosData = [
//         { label: 'Carbs', consumed: carbs, goal: targetCarbs, color: 'bg-blue-500' },
//         { label: 'Protein', consumed: protein, goal: targetProtein, color: 'bg-red-500' },
//         { label: 'Fat', consumed: fat, goal: targetFat, color: 'bg-yellow-500' },
//     ];
    
//     // This function will be passed to the form component
//     const handleAddLog = (logEntry) => {
//         addDailyLog(logEntry); // This updates the global state
//         setIsFormOpen(false);  // Close the form after submission
//     };

//     return(
//         <div className="bg-[#161B22] p-5 rounded-xl border border-gray-800">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-semibold text-white">Macros for Today</h2>
//                 <div className="flex space-x-2">
//                 <button 
//                         onClick={resetTodaysLogs} // 🎯 Call the context function
//                         className="text-sm px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 transition duration-200"
//                     >
//                         Reset Today
//                     </button>
                
//                 {/* 3. The Button */}
//                 <button 
//                     onClick={() => setIsFormOpen(prev => !prev)}
//                     className="text-sm px-3 py-1 rounded-lg bg-green-600 hover:bg-green-700 transition duration-200"
//                 >
//                     {isFormOpen ? 'Close Form' : '+ Log Meal'}
//                 </button>
//                 </div>
//             </div>

//             {/* 4. Display the Form when open */}
//             {isFormOpen && (
//                 <div className="mb-4 p-4 bg-[#0D1117] rounded-lg">
//                     <UpdateMacroForm 
//                         onLog={handleAddLog} 
//                         onClose={() => setIsFormOpen(false)}
//                     />
//                 </div>
//             )}

//             {/* 5. Macro Progress Bars */}
//             <div className='space-y-4'>
//                 {macrosData.map((macro) => (
//                     <MacroProgressBar 
//                     key={macro.label}
//                     label={macro.label}
//                     consumed={macro.consumed}
//                     goal={macro.goal}
//                     color={macro.color}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default MacroCard;

import React, { useState, useMemo } from "react";
import MacroProgressBar from "./MacroProgessBar";
import { useUser } from '../pages/UserContext';
import UpdateMacroForm from './UpdateMacroForm';

const MacroCard = React.memo(() => {
    const {
        userData,
        dailyLogs,
        getTodaysMacros,
        addDailyLog,
        resetTodaysLogs
    } = useUser();

    // Calculate today's macros directly from dailyLogs for reactivity
    const todayString = new Date().toISOString().split('T')[0];
    const todaysMacros = useMemo(() => {
        const todaysEntries = dailyLogs.filter(entry => {
            const entryDate = new Date(entry.date).toISOString().split('T')[0];
            return entryDate === todayString;
        });
        return todaysEntries.reduce((acc, entry) => {
            acc.carbs += entry.carbs || 0;
            acc.protein += entry.protein || 0;
            acc.fat += entry.fat || 0;
            return acc;
        }, { carbs: 0, protein: 0, fat: 0 });
    }, [dailyLogs, todayString]);

    const carbs = todaysMacros?.carbs || 0;
    const protein = todaysMacros?.protein || 0;
    const fat = todaysMacros?.fat || 0;

    const metrics = userData?.metrics || {};
    const targetCarbs = metrics.targetCarbs ?? 220;
    const targetProtein = metrics.targetProtein ?? 120;
    const targetFat = metrics.targetFat ?? 80;

    const [isFormOpen, setIsFormOpen] = useState(false);

    const macrosData = useMemo(() => [
        { label: 'Carbs', consumed: carbs, goal: targetCarbs, color: 'bg-blue-500' },
        { label: 'Protein', consumed: protein, goal: targetProtein, color: 'bg-red-500' },
        { label: 'Fat', consumed: fat, goal: targetFat, color: 'bg-yellow-500' },
    ], [carbs, protein, fat, targetCarbs, targetProtein, targetFat]);

    const handleAddLog = (logEntry) => {
        if (addDailyLog) {
            addDailyLog(logEntry);
        }
        setIsFormOpen(false);
    };

    return (
        <div className="bg-[#161B22] p-5 rounded-xl border border-gray-800">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">
                    Macros for Today
                </h2>

                <div className="flex space-x-2">
                    <button
                        onClick={() => resetTodaysLogs && resetTodaysLogs()}
                        className="text-sm px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 transition duration-200"
                    >
                        Reset Today
                    </button>

                    <button
                        onClick={() => setIsFormOpen(prev => !prev)}
                        className="text-sm px-3 py-1 rounded-lg bg-green-600 hover:bg-green-700 transition duration-200"
                    >
                        {isFormOpen ? 'Close Form' : '+ Log Meal'}
                    </button>
                </div>
            </div>

            {isFormOpen && (
                <div className="mb-4 p-4 bg-[#0D1117] rounded-lg">
                    <UpdateMacroForm
                        onLog={handleAddLog}
                        onClose={() => setIsFormOpen(false)}
                    />
                </div>
            )}

            <div className="space-y-4">
                {macrosData.map((macro) => (
                    <MacroProgressBar
                        key={macro.label}
                        label={macro.label}
                        consumed={macro.consumed}
                        goal={macro.goal}
                        color={macro.color}
                    />
                ))}
            </div>
        </div>
    );
});

export default MacroCard;