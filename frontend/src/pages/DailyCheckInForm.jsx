import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../pages/UserContext'; // Note: Adjusted import path for useUser

const DailyCheckInForm = () => {
    const { 
        // Log functions (now handle replacement logic in Context)
        addSleepLog, 
        addTrainingLog, 
        addWaterLog,
        
        // Reset functions (for the new button)
        resetTodaysSleep,
        resetTodaysTraining,
        resetTodaysWater
    } = useUser(); 
    
    const navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0];
    
    const [sleepHours, setSleepHours] = useState('');
    const [trainingMinutes, setTrainingMinutes] = useState('');
    const [waterGlasses, setWaterGlasses] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const errors = [];
        let dataLogged = false; // Flag to check if any data was successfully logged

        // --- 1. Sleep Logging (Uses replacement logic in Context) ---
        const hours = parseFloat(sleepHours);
        if (sleepHours === '' || (hours >= 0 && hours <= 24)) {
            const durationHours = sleepHours === '' ? 0 : hours;
            addSleepLog({
                date: today,
                durationHours: durationHours,
            });
            if (durationHours > 0) dataLogged = true;
        } else {
            errors.push("Sleep hours must be between 0 and 24.");
        }
        
        // --- 2. Training Logging (Uses replacement logic in Context) ---
        const minutes = parseInt(trainingMinutes);
        if (trainingMinutes === '' || minutes >= 0) {
            const durationMinutes = trainingMinutes === '' ? 0 : minutes;
            addTrainingLog({
                date: today,
                durationMinutes: durationMinutes,
            });
            if (durationMinutes > 0) dataLogged = true;
        } else {
            errors.push("Training time must be 0 minutes or more.");
        }

        // --- 3. Water Logging (Uses replacement logic in Context) ---
        const glasses = parseInt(waterGlasses);
        if (waterGlasses === '' || glasses >= 0) {
            const waterConsumed = waterGlasses === '' ? 0 : glasses;
            addWaterLog({
                date: today,
                glasses: waterConsumed,
            });
            if (waterConsumed > 0) dataLogged = true;
        } else {
            errors.push("Water intake must be 0 glasses or more.");
        }
        
        // --- Feedback ---
        if (errors.length > 0) {
            setStatusMessage(`Error: ${errors.join(' ')}`);
        } else {
            setStatusMessage('✅ Daily stats have been updated (previous entry for today was overwritten).');
            // Clear form fields after successful update
            setSleepHours('');
            setTrainingMinutes('');
            setWaterGlasses(''); 
        }
    };

    // 🎯 NEW: Handler to clear all today's logs
    const handleClearLogs = () => {
        // 1. Call the reset functions exported from context
        resetTodaysSleep();
        resetTodaysTraining();
        resetTodaysWater();

        // 2. Clear the local form state
        setSleepHours('');
        setTrainingMinutes('');
        setWaterGlasses(''); 
        
        // 3. Provide feedback
        setStatusMessage('🧹 All logs for today have been cleared!');
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-[#161B22] rounded-xl border border-gray-800 text-white mt-10">
            <h2 className="text-2xl font-bold mb-6">Daily Check-In for {today}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Sleep Input (No change in JSX structure) */}
                <div>
                    <label htmlFor="sleep" className="block text-sm font-medium text-gray-400">Total Sleep (Hours)</label>
                    <input
                        type="number"
                        id="sleep"
                        min="0"
                        step="0.1"
                        placeholder="e.g., 7.5"
                        value={sleepHours}
                        onChange={(e) => setSleepHours(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                
                {/* Training Input (No change in JSX structure) */}
                <div>
                    <label htmlFor="training" className="block text-sm font-medium text-gray-400">Training Time (Minutes)</label>
                    <input
                        type="number"
                        id="training"
                        min="0"
                        placeholder="e.g., 45"
                        value={trainingMinutes}
                        onChange={(e) => setTrainingMinutes(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                {/* Water Input (No change in JSX structure) */}
                <div>
                    <label htmlFor="water" className="block text-sm font-medium text-gray-400">Water Intake (Glasses, 500ml each)</label>
                    <input
                        type="number"
                        id="water"
                        min="0"
                        placeholder="e.g., 4"
                        value={waterGlasses}
                        onChange={(e) => setWaterGlasses(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                
                {/* Status Message */}
                {statusMessage && (
                    <p className={`text-sm ${statusMessage.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
                        {statusMessage}
                    </p>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Update/Log Daily Stats
                </button>
                
                {/* 🎯 NEW: Clear Logs Button */}
                <button
                    type="button"
                    onClick={handleClearLogs}
                    className="w-full flex justify-center py-2 px-4 border border-red-600 rounded-md shadow-sm text-sm font-medium text-red-400 bg-transparent hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Clear Today's Stats
                </button>

                {/* Back to Dashboard Button */}
                <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="w-full mt-2 flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-transparent hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Back to Dashboard
                </button>
            </form>
        </div>
    );
};

export default DailyCheckInForm;