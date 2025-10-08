import { Divide } from "lucide-react";
import React from "react";
import { LineChart, Line , XAxis , YAxis, CartesianGrid, Tooltip , ResponsiveContainer } from "recharts";

const fullWeightHistory = [
    {date:'2025-01-15', weight: 190},
    {date:'2025-02-15', weight: 188},
    {date:'2025-03-15', weight: 186},
    {date:'2025-04-15', weight: 185},
    {date:'2025-05-15', weight: 184},
    {date:'2025-06-15', weight: 181},
    {date:'2025-07-15', weight: 177},
    {date:'2025-08-15', weight: 174},
    {date:'2025-09-15', weight: 172},
];

const WeightTrackerCard  = () => {
    const today = new Date();
    const fiveMonthsAgo = new Date();
    fiveMonthsAgo.setMonth(today.getMonth() - 4);
    fiveMonthsAgo.setDate(1);

    const filteredData = fullWeightHistory.filter(entry => new Date(entry.date) >= fiveMonthsAgo && new Date(entry.date) <= today).map(entry => ({
        month : new Date(entry.date).toLocaleString('en-US' , {month:'short'}),
        weight : entry.weight,
    }));

    return (
        <div className="bg-[#161B22] p-5 rounded-xl border border-gray-800 h-full">
            <div>
                <h2 className="text-lg font-semibold text-white">Weight Tracker</h2>
                <p className="text-sm text-gray-400"> Last 5 months progress</p>
            </div>
            <div className="mt-4 h-64">
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
        </div>
    );
};

export default WeightTrackerCard;