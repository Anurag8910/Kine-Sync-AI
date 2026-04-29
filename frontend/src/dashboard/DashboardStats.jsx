// src/components/DashboardStats.jsx

import React, { useMemo } from "react";
import { Clock, Moon, Droplets } from "lucide-react";
import StatCard from "./StatCard";
import { useUser } from '../pages/UserContext'; 

const DashboardStats = React.memo(() => {
    const { 
        getWeeklyTrainingTime, 
        getWeeklyAverageSleep,
        getTodaysWaterIntake
    } = useUser();
    
    // Memoize stats calculation
    const statsData = useMemo(() => {
        const trainingStats = getWeeklyTrainingTime();
        const sleepStats = getWeeklyAverageSleep();
        const waterStats = getTodaysWaterIntake(); 

        return [
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
                value: waterStats.display, 
                icon: Droplets 
            },
        ];
    }, [getWeeklyTrainingTime, getWeeklyAverageSleep, getTodaysWaterIntake]);

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
});

export default DashboardStats;