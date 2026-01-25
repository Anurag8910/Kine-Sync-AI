// src/components/UpdateMacroForm.jsx

import React, { useState } from 'react';

const UpdateMacroForm = ({ onLog, onClose }) => {
    const [mealName, setMealName] = useState('');
    const [carbs, setCarbs] = useState('');
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation and conversion
        const newLogEntry = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            meal: mealName || 'Snack',
            carbs: parseInt(carbs) || 0,
            protein: parseInt(protein) || 0,
            fat: parseInt(fat) || 0,
        };

        // Call the function passed from MacroCard to update the Context
        onLog(newLogEntry);
        
        // Clear form fields (Optional)
        setMealName('');
        setCarbs('');
        setProtein('');
        setFat('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <input 
                type="text" 
                placeholder="Meal Name (e.g., Lunch)"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
            />
            
            {/* Input Group for Macros */}
            <div className="grid grid-cols-3 gap-2">
                <input type="number" placeholder="Carbs (g)" value={carbs} onChange={(e) => setCarbs(e.target.value)} required className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md" />
                <input type="number" placeholder="Protein (g)" value={protein} onChange={(e) => setProtein(e.target.value)} required className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md" />
                <input type="number" placeholder="Fat (g)" value={fat} onChange={(e) => setFat(e.target.value)} required className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md" />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
                <button 
                    type="button" 
                    onClick={onClose}
                    className="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-500 rounded-md transition"
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded-md transition"
                >
                    Log Meal
                </button>
            </div>
        </form>
    );
};

export default UpdateMacroForm;