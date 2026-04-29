// src/components/DashboardStats.jsx

import React, { useMemo } from "react";
import { Clock, Moon, Droplets } from "lucide-react";
import StatCard from "./StatCard";
import { useUser } from '../pages/UserContext'; 

const DashboardStats = React.memo(() => {
    const { 
        trainingLogs, 
        sleepLogs,
        waterLogs,
        userData
    } = useUser();
    
    // Calculate stats directly from context state for reactivity
    const statsData = useMemo(() => {
        const today = new Date();
        const todayString = today.toISOString().split('T')[0];
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);

        // Weekly training time
        const weeklyTraining = trainingLogs.filter(log => {
            const logDate = new Date(log.date);
            return logDate >= oneWeekAgo && logDate <= today;
        });
        const totalTrainingMinutes = weeklyTraining.reduce((sum, log) => sum + (log.durationMinutes || 0), 0);
        const trainingHours = Math.floor(totalTrainingMinutes / 60);
        const trainingMins = totalTrainingMinutes % 60;
        const trainingDisplay = `${trainingHours}h ${trainingMins}m`;

        // Weekly average sleep
        const weeklySleep = sleepLogs.filter(log => {
            const logDate = new Date(log.date);
            return logDate >= oneWeekAgo && logDate <= today;
        });
        let sleepDisplay = "N/A";
        if (weeklySleep.length > 0) {
            const totalSleepHours = weeklySleep.reduce((sum, log) => sum + (log.durationHours || 0), 0);
            const avgSleep = totalSleepHours / weeklySleep.length;
            sleepDisplay = `${avgSleep.toFixed(1)}h`;
        }

        // Today's water intake
        const todaysWater = waterLogs.filter(log => {
            const logDate = new Date(log.date).toISOString().split('T')[0];
            return logDate === todayString;
        });
        const totalGlasses = todaysWater.reduce((sum, log) => sum + (log.glasses || 0), 0);
        const goalGlasses = userData.metrics?.targetGlasses || 8;
        const waterDisplay = totalGlasses >= goalGlasses ? "Goal Reached! 👍" : `${totalGlasses}/${goalGlasses} glasses`;

        return [
            {
                title: 'Total Training Time This Week',
                value: trainingDisplay, 
                icon: Clock
            },
            {
                title: 'Average Sleep This Week',
                value: sleepDisplay, 
                icon: Moon  
            },
            {
                title: "Today's Water Intake",
                value: waterDisplay, 
                icon: Droplets 
            },
        ];
    }, [trainingLogs, sleepLogs, waterLogs, userData.metrics]);

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