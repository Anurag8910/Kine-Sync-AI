import React, { useState, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { useUser } from "../pages/UserContext";

const WorkoutCalendar = () => {
    const { trainingLogs } = useUser();

    const [month, setMonth] = useState(new Date());

    const workoutDays = useMemo(() => {
        if (!trainingLogs || !Array.isArray(trainingLogs)) return [];

        return trainingLogs
            .map((log) => {
                const date = new Date(log.date);
                if (isNaN(date)) return null;

                // normalize time to avoid mismatch
                date.setHours(0, 0, 0, 0);
                return date;
            })
            .filter(Boolean);
    }, [trainingLogs]);

    return (
        <div className="bg-[#161B22] p-5 rounded-xl border border-gray-800 flex flex-col">
            <h2 className="text-xl font-bold text-white mb-2">
                🗓️ Training History
            </h2>

            <p className="text-sm font-medium text-indigo-400 mb-4">
                {format(month, "MMMM yyyy")}
            </p>

            <style>{`
                .rdp {
                    --rdp-cell-size: 40px;
                    margin: 0;
                    padding: 0;
                    width: 100%;
                }

                .rdp-day {
                    color: #d1d5db;
                    border-radius: 6px;
                }

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
                    background-color: #10b981;
                }
            `}</style>

            <div className="flex grow justify-center items-center">
                <DayPicker
                    month={month}
                    onMonthChange={setMonth}
                    modifiers={{
                        workout: workoutDays,
                    }}
                    modifiersClassNames={{
                        workout: "workout-day",
                    }}
                    fixedWeeks
                    showOutsideDays={false}
                />
            </div>

            <div className="flex items-center mt-4">
                <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
                <span className="text-xs text-gray-400">
                    Workout completed
                </span>
            </div>
        </div>
    );
};

export default WorkoutCalendar;