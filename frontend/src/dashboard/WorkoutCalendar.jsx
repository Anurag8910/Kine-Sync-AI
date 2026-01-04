import React, { useState, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import { format } from 'date-fns';
import { useUser } from '../pages/UserContext'; 

const WorkoutCalendar = () => {
    // 1. Destructure trainingLogs from the context
    const { trainingLogs } = useUser();
    
    // Set the initial month state for DayPicker navigation
    const [month, setMonth] = useState(new Date()); 

    // ✅ REFINED FIX: Use useMemo to convert all logs into Date objects.
    // The filter is removed because DayPicker handles showing only the dates
    // relevant to the current month being viewed.
  const workoutDays = useMemo(() => {
    return trainingLogs
        .map(log => {
            // ✅ FIX: Append 'T00:00:00Z' to force the Date object to be interpreted 
            // as midnight UTC for the given date.
            return new Date(`${log.date}T00:00:00Z`);
        });
        
}, [trainingLogs]) // Dependency array only includes trainingLogs.
                        // We remove 'month' because we want ALL logs, regardless of the current month view.

    return (
        <div className="bg-[#161B22] p-5 rounded-xl border border-gray-800 h-full flex flex-col">
            
            {/* Header with Title and Current Month Display */}
            <h2 className="text-xl font-bold text-white mb-2">🗓️ Training History</h2>
            <p className="text-sm font-medium text-indigo-400 mb-4">{format(month, 'MMMM yyyy')}</p>
            
            {/* 🛑 NOTE: Keep the <style> block as is, but in a real app, move this CSS 
               to a global stylesheet or a CSS-in-JS solution. */}
            <style>{`
                /* --- General DayPicker Container and Layout --- */
                .rdp {
                    --rdp-cell-size: 40px;
                    --rdp-caption-font-size: 1rem;
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    font-family: inherit;
                }
                .rdp-table {
                    border-collapse: separate;
                    border-spacing: 6px; 
                }
                .rdp-months {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                }
                .rdp-month {
                    margin: 0;
                }
                .rdp-cell {
                    width: var(--rdp-cell-size);
                    height: var(--rdp-cell-size);
                    padding: 0;
                }
                
                /* --- Header (Caption/Navigation) --- */
                .rdp-caption { 
                    padding: 0 0 10px 0;
                    color: #fff;
                    font-weight: 600;
                    justify-content: center;
                    display: none; /* Hide default caption */
                }

                /* Navigation Buttons */
                .rdp-nav { margin: 0; }
                .rdp-nav_button { 
                    color: #9ca3af; 
                    background-color: transparent;
                    border-radius: 6px;
                    padding: 5px;
                    transition: background-color 0.2s;
                }
                .rdp-nav_button:hover:not([disabled]) { 
                    background-color: #1f2937; 
                    color: #fff;
                }
                .rdp-nav_button[disabled] { opacity: 0.3; }

                /* --- Weekday Headers --- */
                .rdp-head {
                    border-bottom: 1px solid #2e343d;
                    margin-bottom: 8px;
                }
                .rdp-head_cell { 
                    color: #9ca3af;
                    font-size: 0.75rem;
                    font-weight: 500;
                    padding: 0 0 5px 0;
                }

                /* --- Day Cells (The main content) --- */
                .rdp-day { 
                    color: #d1d5db; 
                    font-size: 0.875rem; 
                    border-radius: 6px;
                    transition: background-color 0.1s;
                }
                .rdp-day:hover:not([disabled]):not(.rdp-day_selected) { 
                    background-color: #374151; 
                }
                .rdp-button:focus-visible:not([disabled]) { 
                    box-shadow: 0 0 0 2px #4f46e5;
                }

                /* Special Days */
                .rdp-day_today { 
                    color: #4f46e5 !important;
                    font-weight: bold; 
                    background-color: transparent; 
                }
                .rdp-day_outside { 
                    color: #4b5563 !important;
                }
                
                /* --- Custom workout day modifier (Highlight dot) --- */
                .workout-day { 
                    position: relative;
                    font-weight: 600;
                }
                .workout-day::after {
                    content: '';
                    position: absolute;
                    bottom: 2px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background-color: #10b981; /* Green dot */
                }
                    
                /* FINAL FIX: HIDE DOTS ON OUTSIDE DAYS */
                .rdp-day_outside.workout-day::after {
                    display: none;
                }
            `}</style>
            
            <div className="flex-grow flex justify-center items-center">
                <DayPicker 
                    month={month}
                    onMonthChange={setMonth}
                    // Apply both workout highlight and the disabled state for outside days
                    modifiers={{
                        workout: workoutDays, // 🎯 Now contains ALL logs
                        disabled: { day_outside: true }, // Disable interaction on outside days
                    }}
                    modifiersClassNames={{workout : 'workout-day'}}
                    fixedWeeks
                    showOutsideDays={false} 
                />
            </div>
            
            {/* Legend */}
            <div className="flex items-center mt-4">
                <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
                <span className="text-xs text-gray-400">Workout completed</span>
            </div>
        </div>
    );
};

export default WorkoutCalendar;