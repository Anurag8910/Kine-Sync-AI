import React from "react";
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, YAxis } from "recharts";

// Mock data for the last 7 days of water and sleep.
const historyData = [
    {day:'Mon', water : 6, sleep: 7.5},
    {day:'Tue', water : 8, sleep: 7.0},
    {day:'Wed', water : 7, sleep: 8.0},
    {day:'Thu', water : 9, sleep: 6.5},
    {day:'Fri', water : 8, sleep: 7.0},
    {day:'Sat', water : 10, sleep: 9.0},
    {day:'Sun', water : 8, sleep: 8.5},
];

const WaterSleepChart = () => {
    return (
        <div className="bg-[#161B22] p-5 rounded-xl border border-gray-800 h-full">
            {/* Card Header */}
            <div>
                <h2 className="text-lg font-semibold text-white">Water & Sleep History</h2>
                <p className="text-sm text-gray-400">Past 7 days</p>
            </div>
            {/* Chart Container */}
            <div className="mt-4 h-56">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                    data={historyData}
                    margin={{top:5,right:-40, left: -40, bottom:20}}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151"/>
                        <XAxis dataKey="day" interval={0} tick={{ fill: '#9CA3AF' }} stroke="#6B7280" />
                        
                        <YAxis yAxisId="left" tick={{ fill: '#9CA3AF' }} stroke="#6B7280" />
                        <YAxis yAxisId="right" orientation="right" tick={{ fill: '#9CA3AF' }} stroke="#6B7280" />
                        
                        <Tooltip
                        contentStyle={{
                            backgroundColor: '#1F2937',
                            borderColor: '#374151'
                        }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />

                        {/* Line for Water data */}
                        <Line
                        type="monotone"
                        dataKey="water"
                        name = "Water (glasses)"
                        stroke="#34D399"
                        strokeWidth={2}
                        dot = {{r:4}}
                        activeDot ={{r:6}}
                        />
                        {/* Line for Sleep data */}
                        <Line
                        type="monotone"
                        dataKey="sleep"
                        name="Sleep (hours)"
                        stroke="#60A5FA"
                        strokeWidth={2}
                        dot = {{r:4}}
                        activeDot = {{r:6}}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default WaterSleepChart