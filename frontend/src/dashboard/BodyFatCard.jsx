import React from "react";
import { PieChart , Pie , Cell , ResponsiveContainer } from "recharts";
import { useUser } from '../pages/UserContext';
import { useNavigate } from 'react-router-dom';

// Data for the colored sections of the gauge. The 'value' represents the size of the arc.
const gaugeData = [
    { name: 'Essential', value: 8, color: '#EF4444' }, 
    { name: 'Excellent', value: 7, color: '#F97316' }, 
    { name: 'Good', value: 6, color: '#22C55E' },      
    { name: 'Average', value: 5, color: '#3B82F6' },   
    { name: 'Above', value: 4, color: '#EF4444' },     
];

const totalValue = gaugeData.reduce((acc, entry) => acc + entry.value, 0); 

const CustomNeedle = ({ cx, cy, value }) => {
    // We map the BFP value (e.g., 15) to the total value of the gauge segments (30).
    const angle = 180 + (value / totalValue) * 180; 
    const length = 80;
    
    // Calculate the end point of the needle path using trigonometry
    const x = cx + length * Math.cos(-angle * Math.PI / 180);
    const y = cy + length * Math.sin(-angle * Math.PI / 180);

    return (
        <g>
            <circle cx={cx} cy={cy} r={5} fill="#d1d5db" stroke="none" />
            <path d={`M ${cx} ${cy} L ${x} ${y}`} stroke="#d1d5db" strokeWidth={2} />
        </g>
    );
};

const BodyFatCard = () => {
    const { getLatestBFP } = useUser();
    const navigate = useNavigate();
    
    const userBFPValue = getLatestBFP(); 

    const getStatusInfo = (bfp) => {
        if (bfp <= 8) return { text: 'Essential', color: 'text-red-500' };
        if (bfp <= 15) return { text: 'Excellent', color: 'text-orange-500' };
        if (bfp <= 21) return { text: 'Good', color: 'text-green-500' };
        if (bfp <= 26) return { text: 'Average', color: 'text-blue-500' };
        return { text: 'Above Average', color: 'text-red-500' };
    };

    const status = getStatusInfo(userBFPValue);

    return (
        <div className="bg-[#161B22] p-5 rounded-xl border border-gray-800 h-full flex flex-col justify-between">
            
            <div className="flex flex-col"> {/* Wrapper for all content except the button */}
                
                <h2 className="text-lg font-semibold text-white mb-2">Body Fat Percentage</h2>
                
                <div className="relative h-40 w-full">
                    {/* 🎯 FIX 2: ResponsiveContainer must WRAP its content */}
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={gaugeData}
                                dataKey="value"
                                startAngle={180}
                                endAngle={0}
                                innerRadius="70%"
                                outerRadius="90%"
                                cx="50%"
                                cy="80%"
                                paddingAngle={2}
                                stroke="none"
                            >
                                {gaugeData.map((entry) => (
                                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <CustomNeedle cx="50%" cy="80%" value={userBFPValue} />
                        </PieChart>
                        {/* The Text overlay is correctly positioned relative to the container */}
                        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                            <p className="text-4xl font-bold text-white">{userBFPValue}%</p>
                            <p className={`text-sm font-semibold ${status.color}`}>{status.text}</p>
                        </div>
                    </ResponsiveContainer>
                </div>
                

                {/* The Legend */}
                <div className="flex justify-between text-xs text-gray-400 mt-4 px-2">
                    {gaugeData.map((entry) => (
                        <div key={entry.name} className="flex flex-col items-center">
                            <span
                                className="w-2 h-2 rounded-full mb-1"
                                style={{ backgroundColor: entry.color }}
                            ></span>
                            <span>{entry.name}</span>
                        </div>
                    ))}
                </div>

            </div> {/* Closing wrapper div */}


            {/* Button is outside the content wrapper, ensuring it stays at the bottom (due to justify-between on the parent div) */}
            <button
                onClick={() => navigate('/calculate-bfp')}
                className="w-full mt-4 flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Calculate / Update BFP
            </button>
        </div>
    );
};

export default BodyFatCard;