import React, { useMemo } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { useUser } from "../pages/UserContext";
import { useNavigate } from "react-router-dom";

const gaugeData = [
  { name: "Essential", value: 8, color: "#EF4444" },
  { name: "Excellent", value: 7, color: "#F97316" },
  { name: "Good", value: 6, color: "#22C55E" },
  { name: "Average", value: 5, color: "#3B82F6" },
  { name: "Above", value: 4, color: "#EF4444" },
];

const CustomNeedle = React.memo(({ cx, cy, value }) => {
  const safeValue = isNaN(value) ? 0 : value;
  const clamped = Math.max(0, Math.min(safeValue, 30));
  const angle = 180 + (clamped / 30) * 180;
  const length = 80;
  const rad = (-angle * Math.PI) / 180;
  const x = cx + length * Math.cos(rad);
  const y = cy + length * Math.sin(rad);

  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="#d1d5db" />
      <path d={`M ${cx} ${cy} L ${x} ${y}`} stroke="#d1d5db" strokeWidth={2} />
    </g>
  );
});

const BodyFatCard = React.memo(() => {
  const { bfpLogs } = useUser();
  const navigate = useNavigate();

  // Get latest BFP directly from bfpLogs state
  const userBFPValue = useMemo(() => {
    if (!bfpLogs || bfpLogs.length === 0) return 15; // Default value
    const sortedLogs = [...bfpLogs].sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedLogs[0]?.bfp || 15;
  }, [bfpLogs]);

  const status = useMemo(() => {
    if (userBFPValue <= 8) return { text: "Essential", color: "text-red-500" };
    if (userBFPValue <= 15) return { text: "Excellent", color: "text-orange-500" };
    if (userBFPValue <= 21) return { text: "Good", color: "text-green-500" };
    if (userBFPValue <= 26) return { text: "Average", color: "text-blue-500" };
    return { text: "Above Average", color: "text-red-500" };
  }, [userBFPValue]);

  return (
    <div className="bg-[#161B22] p-5 rounded-xl border border-gray-800 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold text-white mb-2">
          Body Fat Percentage
        </h2>

        <div className="relative flex justify-center">
          <PieChart width={400} height={250}>
            <Pie
              data={gaugeData}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              innerRadius={70}
              outerRadius={90}
              cx={200}
              cy={180}
              paddingAngle={2}
              stroke="none"
            >
              {gaugeData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <CustomNeedle cx={200} cy={180} value={userBFPValue} />
          </PieChart>

          <div className="absolute top-[60%] left-1/2 -translate-x-1/2 text-center">
            <p className="text-4xl font-bold text-white">{userBFPValue}%</p>
            <p className={`text-sm font-semibold ${status.color}`}>{status.text}</p>
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-400 mt-4 px-2">
          {gaugeData.map((entry) => (
            <div key={entry.name} className="flex flex-col items-center">
              <span className="w-2 h-2 rounded-full mb-1" style={{ backgroundColor: entry.color }} />
              <span>{entry.name}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate("/calculate-bfp")}
        className="w-full mt-4 py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Calculate / Update BFP
      </button>
    </div>
  );
});

export default BodyFatCard;