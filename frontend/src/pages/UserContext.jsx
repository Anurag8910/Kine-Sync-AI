import React, { createContext, useState, useEffect, useContext } from 'react';

// --- CONSTANTS AND INITIAL STATE ---
const LOCAL_STORAGE_KEY = 'kineSyncAiUserData'; 

const INITIAL_USER_STATE = { 
    auth: { name: '', email: '', isAuthenticated: false },
    profile: { age: '', gender: '', heightCm: '', currentWeightKg: '', mainGoal: '', activityLevel: '' },
    metrics: { targetCalories: 0, BMR: 0, targetSleepHours: 8, targetGlasses: 8 }, // ✅ Added targetGlasses for water goal
};

export const UserContext = createContext(INITIAL_USER_STATE);

// Function to load data from localStorage
const loadInitialState = () => {
    try {
        const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            
            return {
                userData: parsedData.userData || INITIAL_USER_STATE,
                dailyLogs: parsedData.dailyLogs || [],
                trainingLogs: parsedData.trainingLogs || [], 
                sleepLogs: parsedData.sleepLogs || [],
                waterLogs: parsedData.waterLogs || [],
                weightHistory: parsedData.weightHistory || [], 
                bfpLogs: parsedData.bfpLogs || [],
            };
        }
    } catch (error) {
        console.error("Error loading state from localStorage:", error);
    }
    return {
        userData: INITIAL_USER_STATE,
        dailyLogs: [],
        trainingLogs: [], 
        sleepLogs: [], 
        weightHistory: [], 
        bfpLogs: [],
        waterLogs:[],
    };
};


export const UserProvider = ({ children }) => {
    const initialState = loadInitialState();
    
    // State definitions
    const [userData, setUserData] = useState(initialState.userData);
    const [dailyLogs, setDailyLogs] = useState(initialState.dailyLogs);
    const [trainingLogs, setTrainingLogs] = useState(initialState.trainingLogs); 
    const [sleepLogs, setSleepLogs] = useState(initialState.sleepLogs);
    const [waterLogs, setWaterLogs] = useState(initialState.waterLogs || []);
    const [bfpLogs, setBfpLogs] = useState(initialState.bfpLogs); 
    const [weightHistory, setWeightHistory] = useState(initialState.weightHistory);

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
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};