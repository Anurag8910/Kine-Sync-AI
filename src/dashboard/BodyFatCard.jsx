import { Divide } from "lucide-react";
import React from "react";
import { PieChart , Pie , Cell , ResponsiveContainer } from "recharts";

// Data for the colored sections of the gauge. The 'value' represents the size of the arc.
const gaugeData = [
    { name: 'Essential', value: 8, color: '#EF4444' }, // Red
    { name: 'Excellent', value: 7, color: '#F97316' }, // Orange (Typo fixed from Execellent)
    { name: 'Good', value: 6, color: '#22C55E' },      // Green
    { name: 'Average', value: 5, color: '#3B82F6' },    // Blue
    { name: 'Below', value: 4, color: '#EF4444' },     // Red
];

const totalValue = gaugeData.reduce((acc, entry) => acc + entry.value, 0);

const CustomNeedle = ({ cx, cy, value }) => {
  const angle = 180 + (value / totalValue) * 180; // Calculate the angle for the needle
  const length = 80; // The length of the needle
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
    const userBFPValue = 15; // User's current body fat percentage

    const getStatusInfo = (bfp) => {
        if (bfp <= 8) return { text: 'Essential', color: 'text-red-500' };
        if (bfp <= 15) return { text: 'Excellent', color: 'text-orange-500' };
        if (bfp <= 21) return { text: 'Good', color: 'text-green-500' };
        if (bfp <= 26) return { text: 'Average', color: 'text-blue-500' };
        return { text: 'Below', color: 'text-red-500' };
    };

    const status = getStatusInfo(userBFPValue);

    return (
        <div className="bg-[#161B22] p-5 rounded-xl border border-gray-800 h-full">
            <h2 className="text-lg font-semibold text-white mb-2">Body Fat Percentage</h2>
            <div className="relative h-48 w-full">
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
                        {/* We use our new custom needle component for a perfect look */}
                        <CustomNeedle cx="50%" cy="80%" value={userBFPValue} />
                    </PieChart>
                </ResponsiveContainer>
                {/* Text positioned in the middle of the gauge */}
                <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-4xl font-bold text-white">{userBFPValue}%</p>
                    <p className={`text-sm font-semibold ${status.color}`}>{status.text}</p>
                </div>
            </div>

            {/* THE FIX: Legend at the bottom with colored dots */}
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
        </div>
    );
};

export default BodyFatCard