// src/App.jsx

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// Assuming you use the useUser hook from context to check profile setup status
// import { useUser } from './pages/UserContext'; 

// Import your page components
import AuthPage from "./pages/AuthPages.jsx";
// import Details from "./pages/Dashboard.jsx"; // ⚠️ REMOVED: Use only one Dashboard component
import { UserProvider } from './pages/UserContext';
import Dashboard from "./dashboard/Dashboard.jsx"; // Assuming this is your main dashboard
import ProfileSetupWizard from "./pages/ProfileSetupWizard.jsx";
import LandingPage from "./LandingPage/LandingPage.jsx";
import DailyCheckInForm from './pages/DailyCheckInForm';
import BodyFatCalculatorForm from './pages/BodyFatCalculatorForm';
import WeightInputForm from './pages/WeightInputForm.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  // 🎯 FIX 4: Implemented handleLogout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    // You might also need to clear user data from context here
  };

  // NOTE: A real app would check if the profile is setup inside a custom hook or Context, 
  // but for routing purposes, we'll focus on the isAuthenticated flag.

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* Public Routes (Login/Signup) */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                // 🎯 FIX 2: Should navigate to Dashboard if setup is complete
                <Navigate to="/dashboard" /> 
              ) : (
                <AuthPage onLoginSuccess={handleLogin} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" /> 
              ) : (
                <AuthPage onLoginSuccess={handleLogin} />
              )
            }
          />

          {/* Protected Routes */}
          <Route
            path="/setup-profile"
            element={
              isAuthenticated ? <ProfileSetupWizard onLogout={handleLogout} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          
          {/* 🎯 FIX 1: Protecting the Daily Check-in Route */}
          <Route 
            path="/daily-checkin" 
            element={
              isAuthenticated ? <DailyCheckInForm /> : <Navigate to="/login" />
            }
          />
          <Route path="/calculate-bfp" element={<BodyFatCalculatorForm />} />
          <Route path="/log-weight" element={<WeightInputForm />} />

          {/* Add a catch-all redirect for any undefined routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;