import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ onLogout }) {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [userName, setUserName] = useState("");

useEffect(() => {
    const storedName = localStorage.getItem('username');
    if (storedName) {
        setUserName(storedName);
    }
}, []);


    useEffect(() => {
        const setupStatus = localStorage.getItem('profileSetupFinished');
        const storedProfile = localStorage.getItem('userProfile');

        if (setupStatus !== 'true' || !storedProfile) {
            navigate('/setup-profile');
        } else {
            setProfile(JSON.parse(storedProfile));
        }
    }, [navigate]);

    if (!profile) {
        return (
            <div style={{
                minHeight: '100vh',
                backgroundColor: '#121212',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                Loading your dashboard...
            </div>
        );
    }

    return (
        <div style={{ padding: '40px', backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
            <h1>Welcome Back!</h1>

            <p><b>Age:</b> {profile.age}</p>
            <p><b>Gender:</b> {profile.gender}</p>
            <p><b>Height:</b> {profile.heightCm} cm</p>
            <p><b>Weight:</b> {profile.currentWeightKg} kg</p>
            <p><b>Goal:</b> {profile.mainGoal}</p>
            <p><b>Activity Level:</b> {profile.activityLevel}</p>

            <button 
                onClick={() => {
                    localStorage.clear();
                    onLogout();
                }}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Log Out
            </button>
        </div>
    );
}

export default Dashboard;
