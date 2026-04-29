import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext.jsx';

// ── Step indicators ───────────────────────────────────────────
const STEPS = [
    { num: 1, label: 'About You' },
    { num: 2, label: 'Stats' },
    { num: 3, label: 'Goal' },
    { num: 4, label: 'Activity' },
];

const StepIndicator = ({ current }) => (
    <div className="flex items-center justify-center gap-0 mb-10 w-full max-w-lg">
        {STEPS.map(({ num, label }, i) => {
            const done   = current > num;
            const active = current === num;
            return (
                <React.Fragment key={num}>
                    <div className="flex flex-col items-center gap-1.5">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                            done   ? 'bg-blue-500 border-blue-500 text-white' :
                            active ? 'bg-transparent border-blue-500 text-blue-400' :
                                     'bg-transparent border-slate-700 text-slate-600'
                        }`}>
                            {done ? '✓' : num}
                        </div>
                        <span className={`text-xs font-semibold tracking-wide ${active ? 'text-blue-400' : done ? 'text-slate-400' : 'text-slate-700'}`}>
                            {label}
                        </span>
                    </div>
                    {i < STEPS.length - 1 && (
                        <div className={`h-px w-16 mb-5 mx-1 transition-all duration-500 ${done ? 'bg-blue-500' : 'bg-slate-700'}`} />
                    )}
                </React.Fragment>
            );
        })}
    </div>
);

// ── Shared choice button ──────────────────────────────────────
const ChoiceBtn = ({ active, onClick, children, className = '' }) => (
    <div
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyPress={e => e.key === 'Enter' && onClick()}
        className={`flex-1 py-3 px-3 text-sm font-semibold text-center rounded-lg border-2 cursor-pointer transition-all duration-150 select-none ${
            active
                ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                : 'border-slate-700 bg-slate-800/60 text-slate-400 hover:border-slate-500 hover:text-slate-300'
        } ${className}`}
    >
        {children}
    </div>
);

// ── STEP 1 ────────────────────────────────────────────────────
const Step1 = ({ formData, updateFormData }) => (
    <div className="flex flex-col gap-6">
        <div>
            <label className="block text-xs font-semibold text-slate-500 tracking-widest uppercase mb-2">Age</label>
            <input
                type="number"
                placeholder="e.g. 25"
                value={formData.age}
                onChange={e => updateFormData('age', e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-600 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
        </div>
        <div>
            <label className="block text-xs font-semibold text-slate-500 tracking-widest uppercase mb-3">Gender</label>
            <div className="flex gap-2 flex-wrap">
                {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map(g => (
                    <ChoiceBtn key={g} active={formData.gender === g} onClick={() => updateFormData('gender', g)}>
                        {g}
                    </ChoiceBtn>
                ))}
            </div>
        </div>
    </div>
);

// ── STEP 2 ────────────────────────────────────────────────────
const Step2 = ({ formData, updateFormData }) => {
    const unit = formData.heightUnit || 'cm';

    const displayHeight = () => {
        if (!formData.heightCm) return '';
        if (unit === 'cm') return formData.heightCm;
        const ft = Number(formData.heightCm) / 30.48;
        return Number.isNaN(ft) ? '' : ft.toFixed(2);
    };

    const handleHeightChange = e => {
        const val = e.target.value;
        if (val === '') { updateFormData('heightCm', ''); return; }
        if (unit === 'cm') {
            updateFormData('heightCm', val);
        } else {
            const ftNum = parseFloat(val);
            updateFormData('heightCm', Number.isNaN(ftNum) ? '' : (ftNum * 30.48).toFixed(2));
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <label className="block text-xs font-semibold text-slate-500 tracking-widest uppercase mb-2">Height</label>
                <div className="flex">
                    <input
                        type="number"
                        placeholder={unit === 'cm' ? 'e.g. 175' : 'e.g. 5.74'}
                        value={displayHeight()}
                        onChange={handleHeightChange}
                        required
                        step={unit === 'cm' ? '1' : '0.01'}
                        className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 border-r-0 rounded-l-lg text-slate-100 placeholder-slate-600 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                    {['cm', 'ft'].map(u => (
                        <button
                            key={u}
                            type="button"
                            onClick={() => updateFormData('heightUnit', u)}
                            className={`px-4 py-3 text-sm font-bold border border-slate-700 last:rounded-r-lg transition-all ${
                                unit === u
                                    ? 'bg-blue-500 border-blue-500 text-white'
                                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                            }`}
                        >{u}</button>
                    ))}
                </div>
            </div>
            <div>
                <label className="block text-xs font-semibold text-slate-500 tracking-widest uppercase mb-2">Weight (kg)</label>
                <input
                    type="number"
                    placeholder="e.g. 70"
                    value={formData.currentWeightKg}
                    onChange={e => updateFormData('currentWeightKg', e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-600 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
            </div>
        </div>
    );
};

// ── STEP 3 ────────────────────────────────────────────────────
const GOALS = [
    { label: 'Lose Weight',      icon: '🔥', desc: 'Burn fat, get lean' },
    { label: 'Gain Muscle',      icon: '💪', desc: 'Build strength & size' },
    { label: 'Maintain Fitness', icon: '⚡', desc: 'Stay consistent' },
];

const Step3 = ({ formData, updateFormData }) => (
    <div className="grid grid-cols-3 gap-4">
        {GOALS.map(({ label, icon, desc }) => {
            const active = formData.mainGoal === label;
            return (
                <div
                    key={label}
                    onClick={() => updateFormData('mainGoal', label)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={e => e.key === 'Enter' && updateFormData('mainGoal', label)}
                    className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all duration-150 select-none ${
                        active
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-slate-700 bg-slate-800/60 hover:border-slate-500'
                    }`}
                >
                    <span className="text-3xl">{icon}</span>
                    <span className={`text-sm font-bold text-center ${active ? 'text-blue-300' : 'text-slate-300'}`}>{label}</span>
                    <span className="text-xs text-slate-600 text-center">{desc}</span>
                </div>
            );
        })}
    </div>
);

// ── STEP 4 ────────────────────────────────────────────────────
const ACTIVITY_LEVELS = [
    { level: 'Sedentary',         desc: 'Little to no exercise',       icon: '🪑', bar: 1 },
    { level: 'Lightly Active',    desc: 'Exercise 1-2 days/week',      icon: '🚶', bar: 2 },
    { level: 'Moderately Active', desc: 'Exercise 3-5 days/week',      icon: '🏃', bar: 3 },
    { level: 'Very Active',       desc: 'Exercise 6-7 days/week',      icon: '🏋️', bar: 4 },
];

const Step4 = ({ formData, updateFormData }) => (
    <div className="flex flex-col gap-3">
        {ACTIVITY_LEVELS.map(({ level, desc, icon, bar }) => {
            const active = formData.activityLevel === level;
            return (
                <div
                    key={level}
                    onClick={() => updateFormData('activityLevel', level)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={e => e.key === 'Enter' && updateFormData('activityLevel', level)}
                    className={`flex items-center gap-4 px-5 py-4 rounded-xl border-2 cursor-pointer transition-all duration-150 select-none ${
                        active
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-slate-700 bg-slate-800/60 hover:border-slate-500'
                    }`}
                >
                    <span className="text-2xl w-8 text-center">{icon}</span>
                    <div className="flex-1 text-left">
                        <div className={`text-sm font-bold ${active ? 'text-blue-300' : 'text-slate-200'}`}>{level}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
                    </div>
                    {/* Activity bar indicator */}
                    <div className="flex gap-1">
                        {[1,2,3,4].map(i => (
                            <div key={i} className={`w-1.5 h-5 rounded-sm transition-all ${
                                i <= bar
                                    ? active ? 'bg-blue-400' : 'bg-slate-500'
                                    : 'bg-slate-700'
                            }`} />
                        ))}
                    </div>
                </div>
            );
        })}
    </div>
);

// ── Main component ───────────────────────────────────────────
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

    useEffect(() => {
        if (step === 5) {
            const timer = setTimeout(() => { navigate('/dashboard'); }, 1200);
            return () => clearTimeout(timer);
        }
    }, [step, navigate]);

    const updateFormData = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

    const handleNext = async () => {
        if (step === 1 && (!formData.age || !formData.gender))           { setSaveError('Please fill in all fields.'); return; }
        if (step === 2 && (!formData.heightCm || !formData.currentWeightKg)) { setSaveError('Please fill in all fields.'); return; }
        if (step === 3 && !formData.mainGoal)                            { setSaveError('Please select a goal.'); return; }
        if (step === 4 && !formData.activityLevel)                       { setSaveError('Please select an activity level.'); return; }

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

    const handleBack = () => setStep(prev => Math.max(prev - 1, 0));

    const stepsMap = {
        1: { title: 'Tell Us About Yourself', sub: 'Help us personalize your experience.',       Component: Step1 },
        2: { title: 'Your Stats',             sub: 'Used to calculate your fitness metrics.',    Component: Step2 },
        3: { title: 'Your Primary Goal',      sub: 'What do you want to achieve?',              Component: Step3 },
        4: { title: 'Activity Level',         sub: 'How active are you on a typical week?',     Component: Step4 },
    };

    // ── Welcome screen ────────────────────────────────────────
    if (step === 0) return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                {/* Glow icon */}
                <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-4xl shadow-lg shadow-blue-500/20">
                    👋
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold tracking-widest uppercase bg-blue-500/10 text-blue-400 border border-blue-500/25 rounded-full">
                    ♧ Profile Setup
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-100 tracking-tight mb-4 leading-tight">
                    Welcome,<br />
                    <span className="text-blue-500">{userName}!</span>
                </h1>
                <p className="text-slate-500 text-base leading-relaxed mb-10 max-w-sm mx-auto">
                    Let's set up your profile in just 4 quick steps so we can personalize your AI coaching experience.
                </p>
                <button
                    onClick={() => setStep(1)}
                    className="px-10 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold tracking-widest text-sm uppercase rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/45 active:translate-y-0.5 transition-all duration-200"
                >
                    Let's Go →
                </button>
            </div>
        </div>
    );

    // ── Complete screen ───────────────────────────────────────
    if (step === 5) return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-4xl shadow-lg shadow-emerald-500/20">
                    ✅
                </div>
                <h1 className="text-4xl font-black text-slate-100 tracking-tight mb-3">You're All Set!</h1>
                <p className="text-slate-500 text-base">Redirecting to your dashboard...</p>
                {/* Spinner */}
                <div className="mt-8 flex justify-center">
                    <div className="w-6 h-6 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
                </div>
            </div>
        </div>
    );

    // ── Step view ─────────────────────────────────────────────
    const { title, sub, Component } = stepsMap[step];

    return (
        <div className="min-h-screen bg-slate-950 flex items-start justify-center px-4 py-12">
            {/* Background grid */}
            <div
                className="fixed inset-0 pointer-events-none opacity-30"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '48px 48px',
                    maskImage: 'radial-gradient(ellipse 80% 80% at 50% 20%, black 40%, transparent 100%)',
                }}
            />

            <div className="relative w-full max-w-xl">
                {/* Brand */}
                <div className="text-center mb-8">
                    <span className="text-xl font-black tracking-tight text-slate-100">
                        Kine<span className="text-blue-500">-Sync</span>
                        <span className="ml-1.5 text-xs font-semibold tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/25 px-2 py-0.5 rounded align-middle">AI</span>
                    </span>
                </div>

                {/* Step indicator */}
                <StepIndicator current={step} />

                {/* Card */}
                <div className="bg-slate-900 border border-slate-800 border-t-blue-500 rounded-2xl px-8 py-8 shadow-xl shadow-black/40">
                    <h2 className="text-2xl font-black text-slate-100 tracking-tight mb-1 uppercase">{title}</h2>
                    <p className="text-sm text-slate-500 mb-7">{sub}</p>

                    {/* Error */}
                    {(saveError || error) && (
                        <div className="px-3.5 py-2.5 mb-5 text-xs text-red-400 bg-red-500/10 border border-red-500/25 rounded-lg">
                            ⚠ {saveError || error}
                        </div>
                    )}

                    {Component && <Component formData={formData} updateFormData={updateFormData} />}

                    {/* Navigation */}
                    <div className="flex gap-3 mt-8">
                        <button
                            onClick={handleBack}
                            disabled={isSaving || step === 1}
                            className="flex-1 py-3 px-5 text-sm font-bold tracking-widest uppercase bg-slate-800 text-slate-400 border border-slate-700 rounded-xl hover:bg-slate-700 hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
                        >
                            ← Back
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={isSaving}
                            className="flex-[2] py-3 px-5 text-sm font-bold tracking-widest uppercase bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-500/45 disabled:opacity-50 disabled:cursor-not-allowed active:translate-y-0.5 transition-all duration-200"
                        >
                            {step === 4
                                ? isSaving ? 'Saving...' : 'Complete →'
                                : 'Next →'
                            }
                        </button>
                    </div>
                </div>

                {/* Step counter */}
                <p className="text-center text-xs text-slate-700 mt-4 tracking-widest uppercase">
                    Step {step} of 4
                </p>
            </div>
        </div>
    );
};

export default ProfileSetupWizard;