// src/pages/ProfileSetupWizard.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileSetupWizard.css';

const ProfileSetupWizard = () => {
    const navigate = useNavigate();
    // Step 0 = Welcome, Step 1-4 = Questions, Step 5 = Complete
    const [step, setStep] = useState(0); 
    const [formData, setFormData] = useState({
        age: '', gender: '', heightCm: '', currentWeightKg: '', mainGoal: '', activityLevel: '',
    });
    const [isSaving, setIsSaving] = useState(false);
    const userName = "Alex"; // Placeholder for the logged-in user's name

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // src/pages/ProfileSetupWizard.jsx

// ... all other code above ...

const handleNext = () => {
    if (step < 4) {
        // Normal progression to the next step
        setStep(step + 1);
        
    } else if (step === 4) {
        // --- CORRECTED FINAL SUBMISSION LOGIC (Frontend Only) ---
        setIsSaving(true);
        console.log("Profile Data Submitted:", formData);
        
        // 1. Set the flag to bypass the wizard on next login
      //  localStorage.setItem('profileSetupFinished', 'true'); 
        
        // 2. Simulate API latency before showing the completion screen
        setTimeout(() => {
            setIsSaving(false);
            setStep(5); // Move to the "You're All Set!" screen
        }, 1000); // 1-second delay
    }
};

// ... all other code below ...

    const handleBack = () => {
        setStep(step > 0 ? step - 1 : 0);
    };
    const handleResetForTesting = () => {
    // Clear stored setup flags and authentication data
    localStorage.removeItem('token');              // Logout the user
    localStorage.removeItem('profileSetupFinished'); // Clear the wizard completion flag (if used)

    // Optional: reset all form data and step to beginning
    setFormData({
        age: '',
        gender: '',
        heightCm: '',
        currentWeightKg: '',
        mainGoal: '',
        activityLevel: '',
    });
  
     setStep(0);
    // Redirect to login page
    navigate('/login');
};

    // --- Component Definitions (Matching Screenshots) ---

    // Step 1: Tell Us About Yourself
    const Step1 = () => (
        <div className="step-card">
            <div className="form-field">
                <label>Age</label>
                <input type="number" placeholder="Enter your age" value={formData.age} onChange={(e) => updateFormData('age', e.target.value)} required />
            </div>
            <div className="form-field">
                <label>Gender</label>
                <div className="choice-group">
                    {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map(g => (
                        <div key={g} className={`choice-button ${formData.gender === g ? 'active' : ''}`} onClick={() => updateFormData('gender', g)}>
                            <i className="fas fa-user"></i>{g} 
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // Step 2: Current Stats
    const Step2 = () => (
        <div className="step-card">
            <div className="form-field">
                <label>Height</label>
                <div className="input-with-units">
                    <input type="number" placeholder="Enter height in cm" value={formData.heightCm} onChange={(e) => updateFormData('heightCm', e.target.value)} required />
                    <span className="unit-cm active">cm</span>
                    <span className="unit-ft">ft</span>
                </div>
            </div>
            <div className="form-field">
                <label>Current Weight (kg)</label>
                <input type="number" placeholder="Enter your weight" value={formData.currentWeightKg} onChange={(e) => updateFormData('currentWeightKg', e.target.value)} required />
            </div>
        </div>
    );

    // Step 3: Main Fitness Goal
    const Step3 = () => (
        <div className="step-card goal-selection">
            {['Lose Weight', 'Gain Muscle', 'Maintain Fitness'].map(goal => (
                <div key={goal} className={`goal-card ${formData.mainGoal === goal ? 'active' : ''}`} onClick={() => updateFormData('mainGoal', goal)}>
                    <i className="fas fa-heartbeat"></i> 
                    <span>{goal}</span>
                </div>
            ))}
        </div>
    );

    // Step 4: Weekly Activity
    const Step4 = () => (
        <div className="step-card activity-selection">
            {[
                { level: 'Sedentary', desc: 'Little to no exercise' },
                { level: 'Lightly Active', desc: 'Exercise 1-2 days/week' },
                { level: 'Moderately Active', desc: 'Exercise 3-5 days/week' },
                { level: 'Very Active', desc: 'Exercise 6-7 days/week' }
            ].map(({ level, desc }) => (
                <div key={level} className={`activity-card ${formData.activityLevel === level ? 'active-level' : ''}`} onClick={() => updateFormData('activityLevel', level)}>
                    <h3>{level}</h3>
                    <p>{desc}</p>
                </div>
            ))}
        </div>
    );

    const stepsMap = {
        1: { title: 'Tell Us About Yourself', Component: Step1 },
        2: { title: 'What Are Your Current Stats?', Component: Step2 },
        3: { title: "What's Your Main Fitness Goal?", Component: Step3 },
        4: { title: 'How Active Are You on a Weekly Basis?', Component: Step4 },
    };

    // --- Main Render Logic ---

    if (step === 0) {
        // Welcome Screen (First Screenshot)
        return (
            <div className="setup-container welcome-screen">
                <div className="icon-circle"><i className="fas fa-user-circle"></i></div>
                <h1>Welcome, {userName}!</h1>
                <p className="subtitle">Let's quickly set up your profile to create your personalized fitness journey. It will only take a moment.</p>
                <button className="primary-button" onClick={() => setStep(1)}>Let's Go →</button>
            </div>
        );
    }
  
    
    if (step === 5) {
        // Confirmation Screen (Final Screenshot)
        
        return (
            <div className="setup-container complete-screen">
                <div className="icon-circle check-icon"><i className="fas fa-check"></i></div>
                <h1>You're All Set!</h1>
                <p className="subtitle">We've created your personalized plan. Your dashboard is ready to guide you.</p>
           <div className="complete-screen-buttons"> 
            <button className="primary-button" onClick={() => navigate('/dashboard')}>Go to My Dashboard →</button>
            <button className="secondary-button" onClick={handleResetForTesting}>Reset Profile for Testing</button>
        </div>
            </div>
        );
    }

    const CurrentStepComponent = stepsMap[step]?.Component;
    const currentTitle = stepsMap[step]?.title;

    return (
        <div className="setup-container step-view">
            {/* Progress Bar and Step Number */}
            <div className="progress-bar">
                Step {step} of 4
                <div className="progress-line" style={{ width: `${(step / 4) * 100}%` }}></div>
            </div>

            <h2>{currentTitle}</h2>
            
            {CurrentStepComponent && <CurrentStepComponent />}

            {/* Navigation Buttons */}
            <div className="navigation-buttons">
                <button className="secondary-button" onClick={handleBack} disabled={isSaving || step === 0}>
                    ← Back
                </button>
                <button 
                    className="primary-button" 
                    onClick={handleNext} 
                    disabled={isSaving}
                >
                    {step === 4 ? (isSaving ? 'Completing...' : 'Complete →') : 'Next →'}
                </button>
            </div>
        </div>
    );
};

export default ProfileSetupWizard;