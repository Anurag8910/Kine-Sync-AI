import React from "react";
import DashboardHeader from "./DashboardHeader "
import DashboardStats from "./DashboardStats";
import MacroCard from "./MacroCard";
import WeightTrackerCard from "./WeightTrackerCard";
import WorkoutCalendar from "./WorkoutCalendar";
import BodyFatCard from "./BodyFatCard";
import RecentActivitiesCard from "./RecentActivitiesCard";
import WaterSleepChart from "./WaterSleepChart";

const Dashboard = () => {
    return (
    // Main container: This div is now set to cover the entire screen.
    // - fixed, top-0, left-0: Pins the container to the top-left of the viewport.
    // - w-screen, h-screen: Forces the container to be the full width and height of the screen.
    // - overflow-y-auto: Allows scrolling if content overflows vertically.
    <div className="bg-[#0D1117] text-white font-sans fixed top-0 left-0 w-screen h-screen overflow-y-auto">
      
      {/* Content wrapper: This still adds the nice padding around your dashboard content. */}
      <div className="p-4 sm:p-6 md:p-8">
        
        {/* 1. Dashboard Header */}
        <DashboardHeader userName="Anurag" />

        {/* The rest of your dashboard widgets will go here */}
        <main className="mt-6">
          {/* We will add the summary cards, charts, etc., in this section */}
          <DashboardStats/>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6 lg:items-start">
          <div className="lg:col-span-1 space-y-6">
            <MacroCard/>
            <BodyFatCard/>
          </div>
          <div className="lg:col-span-2 space-y-6">
              <WeightTrackerCard/>
              <RecentActivitiesCard/>
            </div>
          <div className="lg:col-span-1 space-y-6">
            <WorkoutCalendar/>
            <WaterSleepChart/>
          </div>

          </div>
        </main>

      </div>
    </div>
  );
}

export default Dashboard