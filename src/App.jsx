// src/App.jsx

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import your page components
import AuthPage from "./pages/AuthPages.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import ProfileSetupWizard from "./pages/ProfileSetupWizard.jsx"; 
// You'd also import WorkoutSession.jsx here when you build it

function App() {
    // State to track if the user is authenticated (logged in)
    // In a real app, this would check localStorage for a JWT token
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('token') // Check token on load
    );

    // Placeholder function to handle successful login/logout
    const handleLogin = (token) => {
        localStorage.setItem('token', token);
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
                {/* 1. PUBLIC ROUTE: Login/Signup */}
                
                <Route 
                    path="/login" 
                    element={
                        isAuthenticated 
                            ? <Navigate to="/dashboard" /> 
                            : <AuthPage onLoginSuccess={handleLogin} />
                    } 
                />
                
                {/* 2. PROTECTED ROUTE: Profile Setup Wizard */}
                {/* Only accessible if logged in. */}
                <Route 
                    path="/setup-profile" 
                    element={
                        isAuthenticated 
                            ? <ProfileSetupWizard /> 
                            : <Navigate to="/login" />
                    } 
                />

                {/* 3. PROTECTED ROUTE: Main Dashboard */}
                <Route 
                    path="/dashboard" 
                    element={
                        isAuthenticated 
                            ? <Dashboard  /> 
                            : <Navigate to="/login" />
                    } 
                />

                {/* Default Path: Redirect logged-in users to the dashboard */}
                <Route 
                    path="/" 
                    element={
                        isAuthenticated 
                            ? <Navigate to="/dashboard" /> 
                            : <Navigate to="/login" />
                    } 
                />

            </Routes>
        </Router>
    );
}

export default App;