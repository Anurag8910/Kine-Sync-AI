
import React, { createContext, useState, useEffect, useContext } from 'react';

// --- INITIAL STATE ---
const INITIAL_USER_STATE = {
  auth: { name: '', email: '', isAuthenticated: false },
  profile: { age: '', gender: '', heightCm: '', currentWeightKg: '', mainGoal: '', activityLevel: '' },
  metrics: { targetCalories: 0, BMR: 0, targetSleepHours: 8, targetGlasses: 8 },
};

export const UserContext = createContext(INITIAL_USER_STATE);



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
    const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    // Helper: Auth header
    const authHeader = () => token ? { Authorization: `Bearer ${token}` } : {};

    // --- AUTH ---
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
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (e) {
            setError('Network error');
        } finally {
            setLoading(false);
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
                // Optionally auto-login after signup
                await login(email, password);
            } else {
                setError(data.message || 'Signup failed');
            }
        } catch (e) {
            setError('Network error');
        } finally {
            setLoading(false);
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
    };

    // --- LOG ADDERS ---
    const addDailyLog = async (logEntry) => {
        try {
            const res = await fetch(`${API_BASE}/logs/daily`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeader() },
                body: JSON.stringify(logEntry)
            });
            const data = await res.json();
            if (data.success && data.data) setDailyLogs(prev => [...prev, data.data]);
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
            if (data.success && data.data) setTrainingLogs(prev => [...prev, data.data]);
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
            if (data.success && data.data) setSleepLogs(prev => [...prev, data.data]);
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
            if (data.success && data.data) setWaterLogs(prev => [...prev, data.data]);
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
            if (data.success && data.data) setWeightHistory(prev => [...prev, data.data]);
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
            if (data.success && data.data) setBfpLogs(prev => [...prev, data.data]);
        } catch {}
    };

    // --- EFFECT: Fetch user and logs on token change ---
    useEffect(() => {
        if (token) {
            fetchUserData();
            fetchDashboardLogs();
        }
    }, [token]);

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
        isLoggedIn: !!token,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

    // -----------------------------------------------------------------------
    // Core Profile Management & Macros
    // -----------------------------------------------------------------------
    
    const updateUserData = (section, newData) => {
        setUserData(prev => ({
            ...prev,
            [section]: { ...prev[section], ...newData }
        }));
    };
    
    // 🚀 FIX 1: Corrected to use the provided dateString
    const getDayName = (dateString) => {
        const date = new Date(dateString); // Use the dateString argument
        // Ensure valid date is created before calling toLocaleDateString
        if (isNaN(date.getTime())) return 'N/A';
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };


    // Function to add/replace BFP log
    const addBFPLog = (newLog) => {
        setBfpLogs(prevLogs => {
            // Remove any existing log for today's date
            const filteredLogs = prevLogs.filter(log => log.date !== newLog.date);
            return [...filteredLogs, newLog].sort((a, b) => new Date(a.date) - new Date(b.date));
        });
    };

    // Function to get the latest BFP value
    const getLatestBFP = () => {
        if (bfpLogs.length === 0) return 15; // Default value if no logs exist
        
        // Since logs are sorted, the last one is the most recent
        const latestLog = bfpLogs[bfpLogs.length - 1];
        return latestLog.bfp;
    };

    const getLastSevenDaysLogs = () => {
        const dataMap = new Map();
        const today = new Date();

        // 1. Initialize the Map for the last 7 days
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            const dateString = d.toISOString().split('T')[0];
            
            // 🚀 FIX 4: Call getDayName with the dateString (or use a local Date object)
            const dayName = getDayName(dateString); 
            
            dataMap.set(dateString, {
                day: dayName,
                dateKey: dateString,
                water: 0, 
                sleep: 0,
            });
        }

        // 2. Populate data from logs
        
        // Water Logs (sums all logs for the day)
        waterLogs.forEach(log => {
            if (dataMap.has(log.date)) {
                dataMap.get(log.date).water = (dataMap.get(log.date).water || 0) + (log.glasses || 0);
            }
        });

        // Sleep Logs (sums all logs for the day, assuming single log per day is intended)
        sleepLogs.forEach(log => {
            if (dataMap.has(log.date)) {
                dataMap.get(log.date).sleep = (dataMap.get(log.date).sleep || 0) + (log.durationHours || 0);
            }
        });

        // 3. Convert Map values to an array, ordered by date
        const historyArray = Array.from(dataMap.values()).sort((a, b) => {
            return new Date(a.dateKey) - new Date(b.dateKey);
        });
        
        // We only need the 'day', 'water', and 'sleep' for the chart
        return historyArray.map(({ day, water, sleep }) => ({ 
            day, 
            water: water, // Keep water as integer glasses
            sleep: parseFloat(sleep.toFixed(1)) // Keep sleep to one decimal place
        }));
    };
    
    // Placeholder function for BMR/TDEE calculation (will be expanded later)
    const completeSignup = () => {
        console.log("Signup completed, metrics calculation triggered.");
        // Logic to calculate and call updateUserData('metrics', { BMR, targetCalories }) goes here.
    };
    
    const addWeightLog = (newEntry) => {
        // Expected newEntry: { date: 'YYYY-MM-DD', weight: 175.5 }
        setWeightHistory(prevHistory => {
            // Remove existing log for the date before adding the new one (upsert logic)
            const filteredHistory = prevHistory.filter(entry => entry.date !== newEntry.date);
            
            const newHistory = [...filteredHistory, newEntry].sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
            return newHistory;
        });
    };

    const getWeightHistory = () => {
        return weightHistory;
    };

    const addDailyLog = (logEntry) => {
        setDailyLogs(prev => [...prev, logEntry]);
    };
    
    // 🚀 FIX 2: Ensure water logs accumulate if multiple entries per day are allowed.
    // Your current implementation already accumulates in `getTodaysWaterIntake`,
    // so we keep the simple append logic here.
    const addWaterLog = (logEntry) => {
        setWaterLogs(prev => [...prev, logEntry]);
    };

    const getTodaysWaterIntake = () => {
        const todayString = new Date().toISOString().split('T')[0];
        
        const todaysEntries = waterLogs.filter(entry => entry.date === todayString);

        // Sum the glasses
        const totalGlasses = todaysEntries.reduce((sum, entry) => sum + (entry.glasses || 0), 0);
        
        // Define the goal (using default 8 if not set)
        const goalGlasses = userData.metrics.targetGlasses || 8; 

        let displayValue;
        
        if (totalGlasses >= goalGlasses) {
            displayValue = "Goal Reached! 👍"; 
        } else {
            displayValue = `${totalGlasses}/${goalGlasses} glasses`;
        }

        return { 
            glasses: totalGlasses, 
            goal: goalGlasses,
            display: displayValue, 
        };
    };

    const resetTodaysSleep = () => {
        const todayString = new Date().toISOString().split('T')[0];
        setSleepLogs(prev => prev.filter(log => log.date !== todayString));
        console.log(`Sleep log for ${todayString} reset.`);
    };

    const resetTodaysTraining = () => {
        const todayString = new Date().toISOString().split('T')[0];
        setTrainingLogs(prev => prev.filter(log => log.date !== todayString));
        console.log(`Training log for ${todayString} reset.`);
    };

    const resetTodaysWater = () => {
        const todayString = new Date().toISOString().split('T')[0];
        // 🚀 FIX: Replace the whole day's water log with an empty log for that date, or simply filter out
        setWaterLogs(prev => prev.filter(log => log.date !== todayString));
        console.log(`Water log for ${todayString} reset.`);
    };
    
    const resetTodaysWeight = () => {
        const todayString = new Date().toISOString().split('T')[0];
        setWeightHistory(prev => prev.filter(log => log.date !== todayString));
        console.log(`Weight log for ${todayString} reset.`);
    };
    
    const resetTodaysLogs = () => {
        const todayString = new Date().toISOString().split('T')[0];
        setDailyLogs(prevLogs => prevLogs.filter(entry => entry.date !== todayString));
        console.log("Today's macro logs have been reset.");
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

    // -----------------------------------------------------------------------
    // NEW: Sleep & Training Logging Functions (Kept as is - Append logic)
    // -----------------------------------------------------------------------

    const addTrainingLog = (logEntry) => {
        setTrainingLogs(prev => [...prev, logEntry]);
    };

    const addSleepLog = (logEntry) => {
        setSleepLogs(prev => [...prev, logEntry]);
    };

    // -----------------------------------------------------------------------
    // NEW: Weekly Calculation Functions (for Dashboard Display)
    // -----------------------------------------------------------------------

    const getWeeklyTrainingTime = () => {
        const today = new Date();
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);
        
        const weeklyLogs = trainingLogs.filter(log => new Date(log.date) >= oneWeekAgo);
        
        const totalMinutes = weeklyLogs.reduce((sum, log) => sum + (log.durationMinutes || 0), 0);
        
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        
        return { 
            totalMinutes, 
            display: `${hours}h ${minutes}m` 
        };
    };
    
    const getWeeklyAverageSleep = () => {
        const today = new Date();
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);
        
        const weeklyLogs = sleepLogs.filter(log => new Date(log.date) >= oneWeekAgo);
        
        if (weeklyLogs.length === 0) {
            return { averageHours: 0, display: "N/A" };
        }
        
        const totalHours = weeklyLogs.reduce((sum, log) => sum + (log.durationHours || 0), 0);
        const averageHours = totalHours / weeklyLogs.length;

        return { 
            averageHours: averageHours, 
            display: `${averageHours.toFixed(1)}h` 
        };
    };

    // -----------------------------------------------------------------------
    // Persistence (Saving to Local Storage)
    // -----------------------------------------------------------------------
    
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
            console.log("State saved to localStorage.");
        } catch (error) {
            console.error("Error saving state to localStorage:", error);
        }
    }, [userData, dailyLogs, trainingLogs, sleepLogs, waterLogs, bfpLogs, weightHistory]); 

    // -----------------------------------------------------------------------
    // Context Value Export
    // -----------------------------------------------------------------------

    const contextValue = {
        userData,
        updateUserData,
        completeSignup,
        resetTodaysLogs,
        addDailyLog,
        getTodaysMacros,
        
        // Logging/Tracking
        addTrainingLog, 
        addSleepLog,
        addWaterLog,
        addWeightLog,
        addBFPLog,
        
        // Log Data Access
        dailyLogs,
        trainingLogs,
        sleepLogs,
        bfpLogs, 
        weightHistory, 
        
        // Calculations & Getters
        getTodaysWaterIntake,
        getWeightHistory,
        getLatestBFP, 
        getWeeklyTrainingTime, 
        getWeeklyAverageSleep, 
        getLastSevenDaysLogs,
        
        // Resets
        resetTodaysWeight,
        resetTodaysSleep,
        resetTodaysTraining,
        resetTodaysWater,
        
        isLoggedIn: !!userData.auth.name, 
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};