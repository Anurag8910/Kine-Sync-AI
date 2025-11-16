import React , { useState} from "react";
import { DayPicker } from "react-day-picker";
import {format} from 'date-fns'

// This is mock data. In a real application, you would fetch the dates
// of completed workouts from your database for the current month.

const workoutDays = [
    new Date(2025,9,2),
    new Date(2025,9,3),
    new Date(2025,9,5),
    new Date(2025,9,8),
    new Date(2025,9,11),
    new Date(2025,9,12),
    new Date(2025,9,15),
];

const WorkoutCalendar = () => {
    const [month,setMonth] = useState(new Date(2025,9)); // Default to the current month

    return (
        <div className="bg-[#161B22] p-5 rounded-xl border border-gray-800 h-full flex flex-col">
            {/* Card Header */}
            <h2 className="text-lg font-semibold text-white">Monthly Workout calendar</h2>
            <p className="text-sm font-medium text-gray-400 mb-4">{format(month,'MMMM yyyy')}</p>
            <style>{`
        /* Default react-day-picker styles + Customizations */
        .rdp {
          --rdp-cell-size: 40px;
          --rdp-caption-font-size: 1rem;
          margin: 0;
          width: 100%
        }
        .rdp-caption_label { font-weight: 500; color: #f9fafb; }
        .rdp-nav_button { color: #9ca3af; }
        .rdp-head_cell, .rdp-day { color: #d1d5db; font-size: 0.875rem; }
        .rdp-day { transition: background-color 0.1s ease-in-out, color 0.1s ease-in-out; }
        .rdp-day:hover { background-color: #374151; }
        .rdp-day_today { font-weight: bold; color: #3b82f6 !important; background-color: transparent; }
        .rdp-day_outside { color: #4b5563 !important; }
        .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: #1f2937; }
        .rdp-button:focus-visible:not([disabled]) { border-color: #3b82f6; box-shadow: none; outline: 2px solid #3b82f6; }
        
        /* Custom workout day modifier */
        .workout-day { 
          position: relative;
          font-weight: 600;
        }
        .workout-day::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #3b82f6;
        }
      `}</style>
      <div className="flex-grow flex justify-center items-center">
      <DayPicker 
      month={month}
      onMonthChange={setMonth}
      modifiers={{workout:workoutDays}}
      modifiersClassNames={{workout : 'workout-day'}}
      fixedWeeks
      />
      </div>
      {/* Legend */}
      <div className="flex items-center mt-4">
        <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
        <span className="text-xs text-gray-400"> Workout completed</span>
      </div>
        </div>
    );
};

export default WorkoutCalendar