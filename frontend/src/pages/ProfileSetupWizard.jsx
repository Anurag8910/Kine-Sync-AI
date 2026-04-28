import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileSetupWizard.css';
import { useUser } from './UserContext.jsx';

/* ================= STEP 1 ================= */
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
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') updateFormData('gender', g);
                        }}
                    >
                        <i className="fas fa-user"></i> {g}
                    </div>
                ))}
            </div>
        </div>
    </div>
);

/* ================= STEP 2 ================= */
const Step2 = ({ formData, updateFormData }) => {
    const unit = formData.heightUnit || 'cm';

    const displayHeight = () => {
        if (!formData.heightCm) return '';
        if (unit === 'cm') return formData.heightCm;

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
            updateFormData('heightCm', val);
        } else {
            const ftNum = parseFloat(val);
            if (Number.isNaN(ftNum)) {
                updateFormData('heightCm', '');
            } else {
                updateFormData('heightCm', (ftNum * 30.48).toFixed(2));
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
                        placeholder={unit === 'cm' ? 'Enter height in cm' : 'Enter height in ft'}
                        value={displayHeight()}
                        onChange={handleHeightChange}
                        required
                        step={unit === 'cm' ? '1' : '0.01'}
                    />
                    <span
                        className={`unit-cm ${unit === 'cm' ? 'active' : ''}`}
                        onClick={() => updateFormData('heightUnit', 'cm')}
                    >
                        cm
                    </span>
                    <span
                        className={`unit-ft ${unit === 'ft' ? 'active' : ''}`}
                        onClick={() => updateFormData('heightUnit', 'ft')}
                    >
                        ft
                    </span>
                </div>
            </div>

            <div className="form-field">
                <label>Weight (kg)</label>
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

/* ================= STEP 3 ================= */
const Step3 = ({ formData, updateFormData }) => (
    <div className="step-card goal-selection">
        {['Lose Weight', 'Gain Muscle', 'Maintain Fitness'].map(goal => (
            <div
                key={goal}
                className={`goal-card ${formData.mainGoal === goal ? 'active' : ''}`}
                onClick={() => updateFormData('mainGoal', goal)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') updateFormData('mainGoal', goal);
                }}
            >
                <i className="fas fa-heartbeat"></i>
                <span>{goal}</span>
            </div>
        ))}
    </div>
);

/* ================= STEP 4 ================= */
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
                onKeyPress={(e) => {
                    if (e.key === 'Enter') updateFormData('activityLevel', level);
                }}
            >
                <h3>{level}</h3>
                <p>{desc}</p>
            </div>
        ))}
    </div>
);

/* ================= MAIN COMPONENT ================= */
const ProfileSetupWizard = ({ onProfileComplete, onLogout }) => {
    const [step, setStep] = useState(0);
    const navigate = useNavigate();
    const { userData, updateUserData, error } = useUser();

    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        heightCm: '',
        heightUnit: 'cm',
        currentWeightKg: '',
        mainGoal: '',
        activityLevel: '',
    });

    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);

    const userName = userData?.auth?.name || 'there';

    /* Redirect after completion */
    useEffect(() => {
        if (step === 5) {
            const timer = setTimeout(() => {
                navigate('/dashboard');
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, [step, navigate]);

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = async () => {
        if (step === 1 && (!formData.age || !formData.gender)) {
            setSaveError('Please fill in all fields.');
            return;
        }

        if (step === 2 && (!formData.heightCm || !formData.currentWeightKg)) {
            setSaveError('Please fill in all fields.');
            return;
        }

        if (step === 3 && !formData.mainGoal) {
            setSaveError('Please select a goal.');
            return;
        }

        if (step === 4 && !formData.activityLevel) {
            setSaveError('Please select an activity level.');
            return;
        }

        setSaveError(null);

        if (step < 4) {
            setStep(prev => prev + 1);
        } else {
            try {
                setIsSaving(true);

                await updateUserData('profile', {
                    age: Number(formData.age),
                    gender: formData.gender,
                    heightCm: Number(formData.heightCm),
                    currentWeightKg: Number(formData.currentWeightKg),
                    mainGoal: formData.mainGoal,
                    activityLevel: formData.activityLevel,
                });

                setStep(5);
                onProfileComplete?.();
            } catch {
                setSaveError('Failed to save profile. Please try again.');
            } finally {
                setIsSaving(false);
            }
        }
    };

    const handleBack = () => {
        setStep(prev => Math.max(prev - 1, 0));
    };

    const stepsMap = {
        1: { title: 'Tell Us About Yourself', Component: Step1 },
        2: { title: 'Your Stats', Component: Step2 },
        3: { title: 'Your Goal', Component: Step3 },
        4: { title: 'Activity Level', Component: Step4 },
    };

    if (step === 0) {
        return (
            <div className="setup-container welcome-screen">
                <h1>Welcome, {userName}!</h1>
                <button onClick={() => setStep(1)}>Let's Go →</button>
            </div>
        );
    }

    if (step === 5) {
        return (
            <div className="setup-container complete-screen">
                <h1>You're All Set!</h1>
                <p>Redirecting to your dashboard...</p>
            </div>
        );
    }

    const StepComponent = stepsMap[step]?.Component;
    const currentTitle = stepsMap[step]?.title;

    return (
        <div className="setup-container step-view">
            <h2>{currentTitle}</h2>

            {(saveError || error) && (
                <div className="error-message">
                    {saveError || error}
                </div>
            )}

            {StepComponent && (
                <StepComponent
                    formData={formData}
                    updateFormData={updateFormData}
                />
            )}

            <div className="navigation-buttons">
                <button onClick={handleBack} disabled={isSaving || step === 0}>
                    ← Back
                </button>
                <button onClick={handleNext} disabled={isSaving}>
                    {step === 4 ? (isSaving ? 'Completing...' : 'Complete →') : 'Next →'}
                </button>
            </div>
        </div>
    );
};

export default ProfileSetupWizard;