import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// NOTE: You would eventually pass the actual user status (e.g., isProfileComplete)
// here from an API call, but for the FE flow, we hardcode the initial redirect.

function Dashboard({ onLogout }) {
    const navigate = useNavigate();
    // In a real app, this state would be fetched from the backend immediately.
    // We set it to true to simulate that the user has already completed the setup
    // upon landing on this page *after* completing the wizard.
    const [isProfileSetupComplete, setIsProfileSetupComplete] = useState(false); 
    const userName = "User"; // Placeholder

    useEffect(() => {
        // --- PROFILE SETUP GATEKEEPER LOGIC ---
        const setupStatus = localStorage.getItem('profileSetupFinished');
        if (setupStatus !== 'true') {
            navigate('/setup-profile');
        } else {
            setIsProfileSetupComplete(true);
        }
    }, [navigate]);

    if (!isProfileSetupComplete) {
        return <div style={{ minHeight: '100vh', backgroundColor: '#121212', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Checking profile status...
        </div>;
    }

    return (
        <div style={{ padding: '40px', backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
            <h1>Welcome Back, {userName}!</h1>
            <p>Your personalized Kine-Sync AI dashboard is ready.</p>
            <button 
                onClick={onLogout} 
                style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Log Out
            </button>
            {/* The actual dashboard content and navigation buttons will go here */}
        </div>
    );
}

export default Dashboard;