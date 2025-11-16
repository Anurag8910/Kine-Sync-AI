import React from "react";
import { Clock, Moon , Droplets } from "lucide-react";
import StatCard from "./StatCard";

const DashboardStats = () => {
    const statsData = [
        {
            title : 'Total Training Time This Week',
            value : '8h 32m',
            icon : Clock
        },
        {
            title : 'Average Sleep This Week',
            value : '7h 45m',
            icon : Moon   
        },
        {
            itle : "Today's Water Intake",
            value : '6/8 glasses',
            icon : Droplets 
        },
    ];
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statsData.map((stats,index) => (
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