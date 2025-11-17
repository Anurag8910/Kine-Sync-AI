// src/App.jsx

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import your page components
import AuthPage from "./pages/AuthPages.jsx";
import Details from "./pages/Dashboard.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import ProfileSetupWizard from "./pages/ProfileSetupWizard.jsx";
import LandingPage from "./LandingPage/LandingPage.jsx";
// You'd also import WorkoutSession.jsx here when you build it

function App() {
  // State to track if the user is authenticated (logged in)
  // In a real app, this would check localStorage for a JWT token
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token") // Check token on load
  );

  // Placeholder function to handle successful login/logout
  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  // const handleLogout = () => {
  //     localStorage.removeItem('token');
  //     setIsAuthenticated(false);
  // };
  // Function to reset profile setup for testing

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/setup-profile" />
            ) : (
              <AuthPage onLoginSuccess={handleLogin} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/setup-profile" />
            ) : (
              <AuthPage onLoginSuccess={handleLogin} />
            )
          }
        />
        <Route
          path="/setup-profile"
          element={
            isAuthenticated ? <ProfileSetupWizard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
