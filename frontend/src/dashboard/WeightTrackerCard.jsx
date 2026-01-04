// src/components/WeightTrackerCard.jsx

import React from "react";
// ... (Recharts imports)
import { LineChart, Line , XAxis , YAxis, CartesianGrid, Tooltip , ResponsiveContainer } from "recharts";
import { useUser } from '../pages/UserContext'; // 🎯 NEW
import { useNavigate } from 'react-router-dom'; // 🎯 NEW


// 🛑 REMOVE fullWeightHistory ARRAY HERE. It will come from context.

const WeightTrackerCard  = () => {
    // 🎯 NEW: Get history data and navigation hook
    const { getWeightHistory } = useUser();
    const navigate = useNavigate();
    
    // Get the full history data from the context
    const fullWeightHistory = getWeightHistory(); 

    const today = new Date();
    const fiveMonthsAgo = new Date();
    fiveMonthsAgo.setMonth(today.getMonth() - 4);
    fiveMonthsAgo.setDate(1);

    const filteredData = fullWeightHistory.filter(entry => new Date(entry.date) >= fiveMonthsAgo && new Date(entry.date) <= today).map(entry => ({
        month : new Date(entry.date).toLocaleString('en-US' , {month:'short'}),
        weight : entry.weight,
    }));
    
    // Determine current/last weight for quick display
    const latestWeight = fullWeightHistory.length > 0 ? fullWeightHistory[fullWeightHistory.length - 1].weight : 'N/A';
    
    return (
        <div className="bg-[#161B22] p-5 rounded-xl border border-gray-800 h-full flex flex-col justify-between">
            <div>
                <h2 className="text-lg font-semibold text-white">Weight Tracker</h2>
                <p className="text-sm text-gray-400">Current Weight: {latestWeight} lbs</p> {/* Quick current weight view */}
            </div>
            
            {/* Chart Area */}
            <div className="mt-4 h-64">
                {/* ... (Your existing LineChart code remains here) ... */}
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                    data={filteredData}
                    margin={{top:5,right:20,left:-10,bottom:5}}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151"/>
                        <XAxis dataKey="month" tick = {{fill:'#9CA3AF'}} stroke="#6B7280"/>
                        <YAxis domain={['dataMin -2', 'dataMax+2']}
                        tick = {{fill:'#9CA3AF'}}
                        stroke="#6B7280"
                        />
                        <Tooltip 
                        contentStyle={{backgroundColor : '#1F2937', borderColor:'#374151'}}
                        />
                        <Line
                        type = "monotone"
                        dataKey= "weight"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        dot = {{r : 4}}
                        activeDot = {{r:6}}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* 🎯 NEW: Log Weight Button */}
           <button
    type="button" // <--- ADD THIS LINE
    onClick={() => navigate('/log-weight')} 
    className="w-full mt-4 flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
>
    Log New Weight
</button>
        </div>
    );
};

export default WeightTrackerCard;