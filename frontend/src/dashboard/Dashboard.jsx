import React, { useEffect } from "react";
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

const Dashboard = () => {
  const { userData, fetchUserData, fetchDashboardLogs, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if(!userData) fetchUserData();
      if(!userData) fetchDashboardLogs();
    } catch (err) {
      console.error(err);
    }
  }, []);

  // ✅ FIXED (no crash)
  const userName = userData?.auth?.name || "Trainee";

  return (
    <div style={{height:"200vh"}} className="bg-[#0D1117] text-white font-sans w-full">
      <div className="p-4 sm:p-6 md:p-8">
        <DashboardHeader userName={userName} />

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
          <DashboardStats />

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <MacroCard />
              <BodyFatCard />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <WeightTrackerCard />
              <RecentActivitiesCard />
            </div>
            <div className="lg:col-span-1 space-y-6">
              <WorkoutCalendar />
              <WaterSleepChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;