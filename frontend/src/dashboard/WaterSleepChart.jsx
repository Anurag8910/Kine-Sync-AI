import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  YAxis,
} from "recharts";
import { useUser } from "../pages/UserContext";

const WaterSleepChart = () => {
  const { getLastSevenDaysLogs } = useUser();

  // ✅ Safe fallback
  const historyData = getLastSevenDaysLogs ? getLastSevenDaysLogs() : [];

  return (
    <div className="bg-[#161B22] p-5 rounded-xl border border-gray-800 ">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-white">
          Water & Sleep History
        </h2>
        <p className="text-sm text-gray-400">Past 7 days</p>
      </div>

      {/* ✅ FIXED: NO ResponsiveContainer */}
      <div className="mt-4 overflow-x-auto">
        <LineChart
          width={500}
          height={250}
          data={historyData || []}
          margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

          {/* Water Axis */}
          <YAxis
            yAxisId="water_y"
            tick={{ fill: "#34D399" }}
            stroke="#34D399"
            domain={[0, "auto"]}
          />

          {/* Sleep Axis */}
          <YAxis
            yAxisId="sleep_y"
            orientation="right"
            tick={{ fill: "#60A5FA" }}
            stroke="#60A5FA"
            domain={[0, 10]}
          />

          <XAxis
            dataKey="day"
            tick={{ fill: "#9CA3AF" }}
            stroke="#6B7280"
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              borderColor: "#374151",
            }}
          />

          <Legend />

          {/* Water Line */}
          <Line
            yAxisId="water_y"
            type="monotone"
            dataKey="water"
            stroke="#34D399"
            strokeWidth={2}
          />

          {/* Sleep Line */}
          <Line
            yAxisId="sleep_y"
            type="monotone"
            dataKey="sleep"
            stroke="#60A5FA"
            strokeWidth={2}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default WaterSleepChart;