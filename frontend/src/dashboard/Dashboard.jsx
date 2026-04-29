import React, { useEffect, useMemo } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import MacroCard from "./MacroCard";
import WeightTrackerCard from "./WeightTrackerCard";
import WorkoutCalendar from "./WorkoutCalendar";
import BodyFatCard from "./BodyFatCard";
import RecentActivitiesCard from "./RecentActivitiesCard";
import WaterSleepChart from "./WaterSleepChart";
import { useUser } from "../pages/UserContext.jsx";
import { Link, useNavigate } from "react-router-dom";

// Memoized child components to prevent re-renders
const MemoizedHeader = React.memo(DashboardHeader);
const MemoizedStats = React.memo(DashboardStats);
const MemoizedMacroCard = React.memo(MacroCard);
const MemoizedWeightCard = React.memo(WeightTrackerCard);
const MemoizedCalendar = WorkoutCalendar;const MemoizedBodyFat = React.memo(BodyFatCard);
const MemoizedActivities = React.memo(RecentActivitiesCard);
const MemoizedWaterSleep = React.memo(WaterSleepChart);

const Dashboard = () => {
  const { userData, logout, loading } = useUser();
  const navigate = useNavigate();

  // Memoize userName to prevent recalculation
  const userName = useMemo(() => userData?.auth?.name || "Trainee", [userData?.auth?.name]);

  // Show loading state while data fetches
  if (loading && !userData?.auth?.name) {
    return (
      <div className="bg-[#0D1117] text-white font-sans w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div style={{height:"200vh"}} className="bg-[#0D1117] text-white font-sans w-full">
      <div className="p-4 sm:p-6 md:p-8">
        <MemoizedHeader userName={userName} />

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-4">
          <Link
            to="/daily-checkin"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            + Log Today's Stats
          </Link>
          <button
            onClick={() => navigate("/exercise-dashboard")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Go to Exercise Dashboard
          </button>
          <button
            onClick={() => { logout(); navigate("/"); }}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Logout
          </button>
        </div>

        <main className="mt-6">
          <MemoizedStats />

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <MemoizedMacroCard />
              <MemoizedBodyFat />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <MemoizedWeightCard />
              <MemoizedActivities />
            </div>
            <div className="lg:col-span-1 space-y-6">
              <MemoizedCalendar />
              <MemoizedWaterSleep />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;