
import React, { createContext, useState, useEffect, useContext } from 'react';

// --- INITIAL STATE ---
const INITIAL_USER_STATE = {
  auth: { name: '', email: '', isAuthenticated: false },
  profile: { age: '', gender: '', heightCm: '', currentWeightKg: '', mainGoal: '', activityLevel: '' },
  metrics: { targetCalories: 0, BMR: 0, targetSleepHours: 8, targetGlasses: 8 },
};

export const UserContext = createContext(INITIAL_USER_STATE);

// Local storage key
const LOCAL_STORAGE_KEY = 'kineSyncUserData';

export const UserProvider = ({ children }) => {
    // JWT token state
    const [token, setToken] = useState(null);
    // User and logs state
    const [userData, setUserData] = useState(INITIAL_USER_STATE);
    const [dailyLogs, setDailyLogs] = useState([]);
    const [trainingLogs, setTrainingLogs] = useState([]);
    const [sleepLogs, setSleepLogs] = useState([]);
    const [waterLogs, setWaterLogs] = useState([]);
    const [bfpLogs, setBfpLogs] = useState([]);
    const [weightHistory, setWeightHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // API base URL
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    // Helper: Auth header
    const authHeader = () => token ? { Authorization: `Bearer ${token}` } : {};

    // --- AUTH ---
    const clearError = () => setError(null);

    const login = async (email, password) => {
        setLoading(true); setError(null);
        try {
            const res = await fetch(`${API_BASE}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.success && data.data.token) {
                setToken(data.data.token);
                setUserData(u => ({ ...u, auth: { ...data.data.user, isAuthenticated: true } }));
                await fetchUserData(data.data.token);
                setLoading(false);
                return { success: true };
            } else {
                setError(data.message || 'Login failed');
                setLoading(false);
                return { success: false, message: data.message || 'Login failed' };
            }
        } catch (e) {
            setError('Network error');
            setLoading(false);
            return { success: false, message: 'Network error' };
        }
    };

    const signup = async (name, email, password) => {
        setLoading(true); setError(null);
        try {
            const res = await fetch(`${API_BASE}/users/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            if (data.success) {
                // Try login after signup
                const loginResult = await login(email, password);
                setLoading(false);
                return { success: true };
            } else {
                setError(data.message || 'Signup failed');
                setLoading(false);
                return { success: false, message: data.message || 'Signup failed' };
            }
        } catch (e) {
            setError('Network error');
            setLoading(false);
            return { success: false, message: 'Network error' };
        }
    };

    const logout = () => {
        setToken(null);
        setUserData(INITIAL_USER_STATE);
        setDailyLogs([]);
        setTrainingLogs([]);
        setSleepLogs([]);
        setWaterLogs([]);
        setBfpLogs([]);
        setWeightHistory([]);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    };

    // --- FETCH USER DATA ---
    const fetchUserData = async (overrideToken) => {
        setLoading(true); setError(null);
        try {
            const res = await fetch(`${API_BASE}/users/me`, {
                headers: { ...authHeader(), ...(overrideToken ? { Authorization: `Bearer ${overrideToken}` } : {}) }
            });
            const data = await res.json();
            if (data.success && data.data) {
                setUserData(u => ({
                    ...u,
                    auth: { name: data.data.name, email: data.data.email, isAuthenticated: true },
                    profile: data.data.profile || INITIAL_USER_STATE.profile,
                    metrics: data.data.metrics || INITIAL_USER_STATE.metrics,
                }));
            }
        } catch (e) {
            setError('Failed to fetch user');
        } finally {
            setLoading(false);
        }
    };

    // --- FETCH DASHBOARD LOGS ---
    const fetchDashboardLogs = async () => {
        setLoading(true); setError(null);
        try {
            const res = await fetch(`${API_BASE}/logs/dashboard`, { headers: authHeader() });
            const data = await res.json();
            console.log("Dashboard logs response:", data); 
            if (data.success && data.data) {
                setDailyLogs(data.data.dailyLogs || []);
                setTrainingLogs(data.data.trainingLogs || []);
                setSleepLogs(data.data.sleepLogs || []);
                setWaterLogs(data.data.waterLogs || []);
                setBfpLogs(data.data.bfpLogs || []);
                setWeightHistory(data.data.weightLogs || []);
            }
        } catch (e) {
            setError('Failed to fetch logs');
        } finally {
            setLoading(false);
        }
    };

    // --- LOG/PROFILE UPDATES ---
    const updateUserData = async (section, newData) => {
        if (section === 'profile') {
            setLoading(true); setError(null);
            try {
                const res = await fetch(`${API_BASE}/users/profile`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', ...authHeader() },
                    body: JSON.stringify(newData)
                });
                const data = await res.json();
                if (data.success && data.data) {
                    setUserData(u => ({ ...u, profile: data.data }));
                } else {
                    setError(data.message || 'Profile update failed');
                }
            } catch (e) {
                setError('Network error');
            } finally {
                setLoading(false);
            }
        }
        // Local update for other sections
        setUserData(prev => ({
            ...prev,
            [section]: { ...prev[section], ...newData }
        }));
    };

    // --- HELPER FUNCTIONS ---
    const getDayName = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'N/A';
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    const getLatestBFP = () => {
        if (bfpLogs.length === 0) return 15;
        const sortedLogs = [...bfpLogs].sort((a, b) => new Date(b.date) - new Date(a.date));
        return sortedLogs[0]?.bfp || 15;
    };

    const getLastSevenDaysLogs = () => {
        const dataMap = new Map();
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            const dateString = d.toISOString().split('T')[0];
            const dayName = getDayName(dateString);
            dataMap.set(dateString, { day: dayName, dateKey: dateString, water: 0, sleep: 0 });
        }

        waterLogs.forEach(log => {
            if (dataMap.has(log.date)) {
                dataMap.get(log.date).water = (dataMap.get(log.date).water || 0) + (log.glasses || 0);
            }
        });

        sleepLogs.forEach(log => {
            if (dataMap.has(log.date)) {
                dataMap.get(log.date).sleep = (dataMap.get(log.date).sleep || 0) + (log.durationHours || 0);
            }
        });

        return Array.from(dataMap.values())
            .sort((a, b) => new Date(a.dateKey) - new Date(b.dateKey))
            .map(({ day, water, sleep }) => ({ 
                day, 
                water, 
                sleep: parseFloat(sleep.toFixed(1)) 
            }));
    };

    const completeSignup = () => {
        console.log("Signup completed, metrics calculation triggered.");
    };

    const getWeightHistory = () => weightHistory;

    const getTodaysWaterIntake = () => {
        const todayString = new Date().toISOString().split('T')[0];
        const todaysEntries = waterLogs.filter(entry => entry.date === todayString);
        const totalGlasses = todaysEntries.reduce((sum, entry) => sum + (entry.glasses || 0), 0);
        const goalGlasses = userData.metrics.targetGlasses || 8;
        const displayValue = totalGlasses >= goalGlasses ? "Goal Reached! 👍" : `${totalGlasses}/${goalGlasses} glasses`;
        return { glasses: totalGlasses, goal: goalGlasses, display: displayValue };
    };

    const getTodaysMacros = () => {
        const todayString = new Date().toISOString().split('T')[0];
        const todaysEntries = dailyLogs.filter(entry => entry.date === todayString);
        return todaysEntries.reduce((acc, entry) => {
            acc.carbs += entry.carbs;
            acc.protein += entry.protein;
            acc.fat += entry.fat;
            return acc;
        }, { carbs: 0, protein: 0, fat: 0 });
    };

    const getWeeklyTrainingTime = () => {
        const today = new Date();
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);
        const weeklyLogs = trainingLogs.filter(log => new Date(log.date) >= oneWeekAgo);
        const totalMinutes = weeklyLogs.reduce((sum, log) => sum + (log.durationMinutes || 0), 0);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return { totalMinutes, display: `${hours}h ${minutes}m` };
    };

    const getWeeklyAverageSleep = () => {
        const today = new Date();
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);
        const weeklyLogs = sleepLogs.filter(log => new Date(log.date) >= oneWeekAgo);
        if (weeklyLogs.length === 0) return { averageHours: 0, display: "N/A" };
        const totalHours = weeklyLogs.reduce((sum, log) => sum + (log.durationHours || 0), 0);
        const averageHours = totalHours / weeklyLogs.length;
        return { averageHours, display: `${averageHours.toFixed(1)}h` };
    };

    // --- RESET FUNCTIONS ---
    const resetTodaysSleep = () => {
        const todayString = new Date().toISOString().split('T')[0];
        setSleepLogs(prev => prev.filter(log => log.date !== todayString));
    };

    const resetTodaysTraining = () => {
        const todayString = new Date().toISOString().split('T')[0];
        setTrainingLogs(prev => prev.filter(log => log.date !== todayString));
    };

    const resetTodaysWater = () => {
        const todayString = new Date().toISOString().split('T')[0];
        setWaterLogs(prev => prev.filter(log => log.date !== todayString));
    };

    const resetTodaysWeight = () => {
        const todayString = new Date().toISOString().split('T')[0];
        setWeightHistory(prev => prev.filter(log => log.date !== todayString));
    };

    const resetTodaysLogs = () => {
        const todayString = new Date().toISOString().split('T')[0];
        setDailyLogs(prevLogs => prevLogs.filter(entry => entry.date !== todayString));
    };

    // --- LOG ADDERS (API-based) with auto-refresh ---
    const addDailyLog = async (logEntry) => {
        try {
            const res = await fetch(`${API_BASE}/logs/daily`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeader() },
                body: JSON.stringify(logEntry)
            });
            const data = await res.json();
            if (data.success && data.data) {
                setDailyLogs(prev => [...prev, data.data]);
                // Auto-refresh all dashboard data to ensure sync
                fetchDashboardLogs();
            }
        } catch {}
    };

    const addTrainingLog = async (logEntry) => {
        try {
            const res = await fetch(`${API_BASE}/logs/training`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeader() },
                body: JSON.stringify(logEntry)
            });
            const data = await res.json();
            if (data.success && data.data) {
                setTrainingLogs(prev => [...prev, data.data]);
                fetchDashboardLogs();
            }
        } catch {}
    };

    const addSleepLog = async (logEntry) => {
        try {
            const res = await fetch(`${API_BASE}/logs/sleep`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeader() },
                body: JSON.stringify(logEntry)
            });
            const data = await res.json();
            if (data.success && data.data) {
                setSleepLogs(prev => [...prev, data.data]);
                fetchDashboardLogs();
            }
        } catch {}
    };

    const addWaterLog = async (logEntry) => {
        try {
            const res = await fetch(`${API_BASE}/logs/water`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeader() },
                body: JSON.stringify(logEntry)
            });
            const data = await res.json();
            if (data.success && data.data) {
                setWaterLogs(prev => [...prev, data.data]);
                fetchDashboardLogs();
            }
        } catch {}
    };

    const addWeightLog = async (logEntry) => {
        try {
            const res = await fetch(`${API_BASE}/logs/weight`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeader() },
                body: JSON.stringify(logEntry)
            });
            const data = await res.json();
            if (data.success && data.data) {
                setWeightHistory(prev => [...prev, data.data]);
                fetchDashboardLogs();
            }
        } catch {}
    };

    const addBFPLog = async (logEntry) => {
        try {
            const res = await fetch(`${API_BASE}/logs/bfp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeader() },
                body: JSON.stringify(logEntry)
            });
            const data = await res.json();
            if (data.success && data.data) {
                setBfpLogs(prev => [...prev, data.data]);
                fetchDashboardLogs();
            }
        } catch {}
    };

    // --- EFFECT: Fetch user and logs on token change ---
    useEffect(() => {
        if (token) {
            fetchUserData();
            fetchDashboardLogs();
        }
    }, [token]);

    // --- EFFECT: Persist to localStorage ---
    useEffect(() => {
        try {
            const dataToStore = JSON.stringify({ 
                userData, 
                dailyLogs, 
                trainingLogs, 
                sleepLogs, 
                waterLogs,
                bfpLogs, 
                weightHistory, 
            });
            localStorage.setItem(LOCAL_STORAGE_KEY, dataToStore);
        } catch (error) {
            console.error("Error saving state to localStorage:", error);
        }
    }, [userData, dailyLogs, trainingLogs, sleepLogs, waterLogs, bfpLogs, weightHistory]);

    // --- CONTEXT VALUE ---
    const contextValue = {
        userData,
        token,
        loading,
        error,
        login,
        signup,
        logout,
        updateUserData,
        addDailyLog,
        addTrainingLog,
        addSleepLog,
        addWaterLog,
        addWeightLog,
        addBFPLog,
        dailyLogs,
        trainingLogs,
        sleepLogs,
        waterLogs,
        bfpLogs,
        weightHistory,
        fetchDashboardLogs,
        fetchUserData,
        isLoggedIn: !!token,
        clearError,
        // Additional helpers
        completeSignup,
        resetTodaysLogs,
        getTodaysMacros,
        getTodaysWaterIntake,
        getWeightHistory,
        getLatestBFP,
        getWeeklyTrainingTime,
        getWeeklyAverageSleep,
        getLastSevenDaysLogs,
        resetTodaysWeight,
        resetTodaysSleep,
        resetTodaysTraining,
        resetTodaysWater,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};