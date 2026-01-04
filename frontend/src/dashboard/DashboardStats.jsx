// src/components/DashboardStats.jsx

import React from "react";
import { Clock, Moon, Droplets } from "lucide-react";
import StatCard from "./StatCard";
import { useUser } from '../pages/UserContext'; 

const DashboardStats = () => {
    const { 
        getWeeklyTrainingTime, 
        getWeeklyAverageSleep,
        getTodaysWaterIntake // 🎯 NEW
    } = useUser();
    
    // Calculate live values
    const trainingStats = getWeeklyTrainingTime();
    const sleepStats = getWeeklyAverageSleep();
    const waterStats = getTodaysWaterIntake(); 

    const statsData = [
        {
            title: 'Total Training Time This Week',
            value: trainingStats.display, 
            icon: Clock
        },
        {
            title: 'Average Sleep This Week',
            value: sleepStats.display, 
            icon: Moon  
        },
        {
            title: "Today's Water Intake",
            // 🎯 Use LIVE calculated data (e.g., "6/8 glasses")
            value: waterStats.display, 
            icon: Droplets 
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statsData.map((stats, index) => (
                <StatCard
                    key={index}
                    title={stats.title}
                    value={stats.value}
                    icon={stats.icon}
                />
            ))}
        </div>
    );
};

export default DashboardStats;