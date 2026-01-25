import React from "react";
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, YAxis } from "recharts";
import { useUser } from '../pages/UserContext'; // 🎯 Import useUser

const WaterSleepChart = () => {
    // 🎯 1. Fetch the data from context
    const { getLastSevenDaysLogs } = useUser();
    const historyData = getLastSevenDaysLogs();

    // The rest of your component remains largely the same, but we need to 
    // connect the water and sleep lines to the correct Y-axes.
    
    return (
        <div className="bg-[#161B22] p-5 rounded-xl border border-gray-800 h-full">
            {/* Card Header */}
            <div>
                <h2 className="text-lg font-semibold text-white">Water & Sleep History</h2>
                <p className="text-sm text-gray-400">Past 7 days</p>
            </div>
            {/* Chart Container */}
            <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                    data={historyData}
                    margin={{top:5,right:1, left: 1, bottom:20}} // Adjusted margin slightly
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151"/>
                        
                        {/* YAxis for Water (left side, using dataKey "water") */}
                        <YAxis 
                            yAxisId="water_y" 
                            tick={{ fill: '#34D399' }} // Green color for tick numbers
                            stroke="#34D399" 
                            domain={[0, 'auto']} // Start at 0, go to auto max
                            label={{ value: 'Glasses', angle: -90, position: 'insideLeft', fill: '#34D399' }}
                        />
                        
                        {/* YAxis for Sleep (right side, using dataKey "sleep") */}
                        <YAxis 
                            yAxisId="sleep_y" 
                            orientation="right" 
                            tick={{ fill: '#60A5FA' }} // Blue color for tick numbers
                            stroke="#60A5FA" 
                            domain={[0, 10]} // A more realistic domain for sleep hours
                            label={{ value: 'Hours', angle: 90, position: 'insideRight', fill: '#60A5FA' }}
                        />
                        
                        <XAxis 
                            dataKey="day" 
                            interval={0} 
                            tick={{ fill: '#9CA3AF' }} 
                            stroke="#6B7280" 
                        />
                        
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1F2937',
                                borderColor: '#374151'
                            }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />

                        {/* Line for Water data (Connect to the left axis: water_y) */}
                        <Line
                        yAxisId="water_y" // 🎯 Connect to Water Axis
                        type="monotone"
                        dataKey="water"
                        name="Water (glasses)"
                        stroke="#34D399"
                        strokeWidth={2}
                        dot={{r:4}}
                        activeDot={{r:6}}
                        />
                        
                        {/* Line for Sleep data (Connect to the right axis: sleep_y) */}
                        <Line
                        yAxisId="sleep_y" // 🎯 Connect to Sleep Axis
                        type="monotone"
                        dataKey="sleep"
                        name="Sleep (hours)"
                        stroke="#60A5FA"
                        strokeWidth={2}
                        dot={{r:4}}
                        activeDot={{r:6}}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default WaterSleepChart;