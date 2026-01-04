import React, { useState } from 'react';
import { useUser } from '../pages/UserContext';
import { useNavigate } from 'react-router-dom';

const WeightInputForm = () => {
    
    const { addWeightLog, resetTodaysWeight } = useUser();
    const navigate = useNavigate();

    // Initialize state with today's date and empty weight
    const todayDate = new Date().toISOString().split('T')[0];
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState(todayDate);
    const [statusMessage, setStatusMessage] = useState('');
    const handleClear = () => {
        if (window.confirm("Are you sure you want to delete today's weight log?")) {
            // Check if the weight log for today exists before navigating
            resetTodaysWeight(); // Call the context function
            alert("Today's weight log has been cleared.");
            
            // Navigate back to the dashboard after clearing
            navigate('/dashboard'); 
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatusMessage('');

        const w = parseFloat(weight);
        
        if (!w || w <= 0) {
            setStatusMessage('Error: Please enter a valid weight.');
            return;
        }

        if (!date) {
            setStatusMessage('Error: Please select a date.');
            return;
        }

        // Log the new weight entry to the context
        addWeightLog({
            date: date,
            weight: w,
        });
        

        // Clear the form and navigate back after a short delay
        setStatusMessage(`✅ Weight of ${w} lbs logged successfully!`);
        setTimeout(() => {
            navigate('/dashboard'); // Navigate back to the dashboard/home page
        }, 3000);
     
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-[#161B22] rounded-xl border border-gray-800 text-white mt-10">
            <h2 className="text-2xl font-bold mb-6">Log Weekly Weight</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Date Input */}
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-400">Date</label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        max={todayDate} // Prevent logging future dates
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                
                {/* Weight Input */}
                <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-400">Weight (lbs)</label>
                    <input
                        id="weight"
                        type="number"
                        step="0.1"
                        min="0"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="e.g., 175.5"
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                {/* Status Message */}
                {statusMessage && (
                    <p className={`text-sm ${statusMessage.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
                        {statusMessage}
                    </p>
                )}
                
                {/* Submit Button */}
               <div className="flex justify-between mt-8 space-x-4">
                    {/* Clear Button */}
                    <button
                        type="button" // 👈 IMPORTANT: Use type="button"
                        onClick={handleClear}
                        className="w-full py-2 px-4 border border-red-600 rounded-md shadow-sm text-sm font-medium text-red-400 bg-transparent hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
                    >
                        Clear Today's Log
                    </button>
                    
                    {/* Submit Button (existing) */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                    >
                        Submit Weight
                    </button>
                </div>
            </form>

            {/* Back to Dashboard Button */}
            <button
                type="button"
                onClick={() => navigate('/dashboard')} // Assuming '/' is the dashboard route
                className="w-full mt-4 flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-transparent hover:bg-gray-700"
            >
                Back to Dashboard
            </button>
        </div>
    );
};

export default WeightInputForm;