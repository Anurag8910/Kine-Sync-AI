import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileSetupWizard.css';



const Step1 = ({ formData, updateFormData }) => (
    <div className="step-card">
        <div className="form-field">
            <label>Age</label>
            <input
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => updateFormData('age', e.target.value)}
                required
            />
        </div>
        <div className="form-field">
            <label>Gender</label>
            <div className="choice-group">
                {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map(g => (
                    <div
                        key={g}
                        className={`choice-button ${formData.gender === g ? 'active' : ''}`}
                        onClick={() => updateFormData('gender', g)}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => { if (e.key === 'Enter') updateFormData('gender', g); }}
                    >
                        <i className="fas fa-user"></i>{g}
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const Step2 = ({ formData, updateFormData }) => {

    const unit = formData.heightUnit || 'cm';

    const displayHeight = () => {
        if (formData.heightCm === '' || formData.heightCm === null || formData.heightCm === undefined) return '';
        if (unit === 'cm') return formData.heightCm;
        // convert cm -> ft (decimal)
        const ft = Number(formData.heightCm) / 30.48;
        return Number.isNaN(ft) ? '' : ft.toFixed(2);
    };

    const handleHeightChange = (e) => {
        const val = e.target.value;
        if (val === '') {
            updateFormData('heightCm', '');
            return;
        }
        if (unit === 'cm') {
            // store raw cm (allow numeric string)
            updateFormData('heightCm', val);
        } else {
            // user typed feet; convert to cm and store
            const ftNum = parseFloat(val);
            if (Number.isNaN(ftNum)) {
                updateFormData('heightCm', '');
            } else {
                const cm = (ftNum * 30.48).toFixed(2);
                updateFormData('heightCm', cm);
            }
        }
    };

    return (
        <div className="step-card">
            <div className="form-field">
                <label>Height</label>
                <div className="input-with-units">
                    <input
                        type="number"
                        placeholder={unit === 'cm' ? "Enter height in cm" : "Enter height in ft (decimal)"}
                        value={displayHeight()}
                        onChange={handleHeightChange}
                        required
                        step={unit === 'cm' ? "1" : "0.01"}
                    />
                    <span
                        className={`unit-cm ${unit === 'cm' ? 'active' : ''}`}
                        onClick={() => updateFormData('heightUnit', 'cm')}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => { if (e.key === 'Enter') updateFormData('heightUnit', 'cm'); }}
                    >
                        cm
                    </span>
                    <span
                        className={`unit-ft ${unit === 'ft' ? 'active' : ''}`}
                        onClick={() => updateFormData('heightUnit', 'ft')}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => { if (e.key === 'Enter') updateFormData('heightUnit', 'ft'); }}
                    >
                        ft
                    </span>
                </div>
                <small className="help-text">Switch between cm and ft.</small>
            </div>
            <div className="form-field">
                <label>Current Weight (kg)</label>
                <input
                    type="number"
                    placeholder="Enter your weight"
                    value={formData.currentWeightKg}
                    onChange={(e) => updateFormData('currentWeightKg', e.target.value)}
                    required
                />
            </div>
        </div>
    );
};

const Step3 = ({ formData, updateFormData }) => (
    <div className="step-card goal-selection">
        {['Lose Weight', 'Gain Muscle', 'Maintain Fitness'].map(goal => (
            <div
                key={goal}
                className={`goal-card ${formData.mainGoal === goal ? 'active' : ''}`}
                onClick={() => updateFormData('mainGoal', goal)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => { if (e.key === 'Enter') updateFormData('mainGoal', goal); }}
            >
                <i className="fas fa-heartbeat"></i>
                <span>{goal}</span>
            </div>
        ))}
    </div>
);

const Step4 = ({ formData, updateFormData }) => (
    <div className="step-card activity-selection">
        {[
            { level: 'Sedentary', desc: 'Little to no exercise' },
            { level: 'Lightly Active', desc: 'Exercise 1-2 days/week' },
            { level: 'Moderately Active', desc: 'Exercise 3-5 days/week' },
            { level: 'Very Active', desc: 'Exercise 6-7 days/week' }
        ].map(({ level, desc }) => (
            <div
                key={level}
                className={`activity-card ${formData.activityLevel === level ? 'active-level' : ''}`}
                onClick={() => updateFormData('activityLevel', level)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => { if (e.key === 'Enter') updateFormData('activityLevel', level); }}
            >
                <h3>{level}</h3>
                <p>{desc}</p>
            </div>
        ))}
    </div>
);

const ProfileSetupWizard = () => {
    const navigate = useNavigate();
    // Step 0 = Welcome, Step 1-4 = Questions, Step 5 = Complete
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        heightCm: '',
        heightUnit: 'cm', // new: stores which unit to display/edit
        currentWeightKg: '',
        mainGoal: '',
        activityLevel: '',
    });
    const [isSaving, setIsSaving] = useState(false);
    const userName = "Alex"; // Placeholder for the logged-in user's name

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (step < 4) {
            setStep(step + 1);
        } else if (step === 4) {
            setIsSaving(true);
            console.log("Profile Data Submitted:", formData);

            // Simulate API latency before showing the completion screen
            setTimeout(() => {
                setIsSaving(false);
                setStep(5); // Move to the "You're All Set!" screen
            }, 1000); // 1-second delay
        }
    };

    const handleBack = () => {
        setStep(step > 0 ? step - 1 : 0);
    };

    const handleResetForTesting = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('profileSetupFinished');
        setFormData({
            age: '',
            gender: '',
            heightCm: '',
            heightUnit: 'cm',
            currentWeightKg: '',
            mainGoal: '',
            activityLevel: '',
        });
        setStep(0);
        navigate('/login');
    };

    const stepsMap = {
        1: { title: 'Tell Us About Yourself', Component: Step1 },
        2: { title: 'What Are Your Current Stats?', Component: Step2 },
        3: { title: "What's Your Main Fitness Goal?", Component: Step3 },
        4: { title: 'How Active Are You on a Weekly Basis?', Component: Step4 },
    };

    if (step === 0) {
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
        return (
            <div className="setup-container complete-screen">
                <div className="icon-circle check-icon"><i className="fas fa-check"></i></div>
                <h1>You're All Set!</h1>
                <p className="subtitle">We've created your personalized plan. Your dashboard is ready to guide you.</p>
                <div className="complete-screen-buttons">
                    <button className="primary-button" onClick={() => navigate('/dashboard')}>Get Started →</button>
                    <button className="secondary-button" onClick={handleResetForTesting}>Reset Profile for Testing</button>
                </div>
            </div>
        );
    }

    const StepComponent = stepsMap[step]?.Component;
    const currentTitle = stepsMap[step]?.title;

    return (
        <div className="setup-container step-view">
            <div className="progress-bar">
                Step {step} of 4
                <div className="progress-line" style={{ width: `${(step / 4) * 100}%` }}></div>
            </div>

            <h2>{currentTitle}</h2>

            {StepComponent && <StepComponent formData={formData} updateFormData={updateFormData} />}

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