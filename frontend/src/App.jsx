// src/App.jsx

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import AuthPage from "./pages/AuthPages.jsx";
import { UserProvider, useUser } from "./pages/UserContext";
import Dashboard from "./dashboard/Dashboard.jsx";
import ProfileSetupWizard from "./pages/ProfileSetupWizard.jsx";
import LandingPage from "./LandingPage/LandingPage.jsx";
import DailyCheckInForm from "./pages/DailyCheckInForm";
import BodyFatCalculatorForm from "./pages/BodyFatCalculatorForm";
import WeightInputForm from "./pages/WeightInputForm.jsx";
import ExerciseDashboard from "./dashboard/ExerciseDashboard.jsx";

function AppRoutes() {
  const { userData, isLoggedIn, loading } = useUser();
  const location = useLocation();

  // Profile is considered complete if all required fields are filled
  const profile = userData?.profile || {};
  const profileComplete = Boolean(
    profile.age && profile.gender && profile.heightCm && profile.currentWeightKg && profile.mainGoal && profile.activityLevel
  );

  // Show nothing while loading
  if (loading) return null;

  return (
    <Routes>
      {/* Landing Page */}
      <Route
        path="/"
        element={
          !isLoggedIn ? (
            <LandingPage />
          ) : !profileComplete ? (
            <Navigate to="/setup-profile" state={{ from: location }} replace />
          ) : (
            <Navigate to="/dashboard" state={{ from: location }} replace />
          )
        }
      />


      {/* Login */}
      <Route
        path="/login"
        element={
          !isLoggedIn ? (
            <AuthPage />
          ) : !profileComplete ? (
            <Navigate to="/setup-profile" state={{ from: location }} replace />
          ) : (
            <Navigate to="/dashboard" state={{ from: location }} replace />
          )
        }
      />

      {/* Signup */}
      <Route
        path="/signup"
        element={
          !isLoggedIn ? (
            <AuthPage />
          ) : !profileComplete ? (
            <Navigate to="/setup-profile" state={{ from: location }} replace />
          ) : (
            <Navigate to="/dashboard" state={{ from: location }} replace />
          )
        }
      />

      {/* Setup Profile */}
      <Route
        path="/setup-profile"
        element={
          isLoggedIn ? (
            profileComplete ? (
              <Navigate to="/dashboard" state={{ from: location }} replace />
            ) : (
              <ProfileSetupWizard />
            )
          ) : (
            <Navigate to="/login" state={{ from: location }} replace />
          )
        }
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            profileComplete ? (
              <Dashboard />
            ) : (
              <Navigate to="/setup-profile" state={{ from: location }} replace />
            )
          ) : (
            <Navigate to="/login" state={{ from: location }} replace />
          )
        }
      />

      {/* Other Protected Routes */}
      <Route
        path="/daily-checkin"
        element={
          isLoggedIn && profileComplete ? (
            <DailyCheckInForm />
          ) : (
            <Navigate to={isLoggedIn ? "/setup-profile" : "/login"} state={{ from: location }} replace />
          )
        }
      />

      <Route
        path="/calculate-bfp"
        element={
          isLoggedIn && profileComplete ? (
            <BodyFatCalculatorForm />
          ) : (
            <Navigate to={isLoggedIn ? "/setup-profile" : "/login"} state={{ from: location }} replace />
          )
        }
      />

      <Route
        path="/log-weight"
        element={
          isLoggedIn && profileComplete ? (
            <WeightInputForm />
          ) : (
            <Navigate to={isLoggedIn ? "/setup-profile" : "/login"} state={{ from: location }} replace />
          )
        }
      />
      <Route path="/exercise-dashboard"
        element={
          isLoggedIn  ?
            <ExerciseDashboard />
          : <Navigate to="/login"/>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;