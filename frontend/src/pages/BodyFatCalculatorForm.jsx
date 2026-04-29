import React, { useState } from 'react';
import { useUser } from '../pages/UserContext';
import { useNavigate } from 'react-router-dom';

// The U.S. Navy Body Fat Formula (uses inches and pounds)
const calculateNavyBFP = (gender, height, neck, waist, hip) => {
    // Ensure inputs are numbers and greater than zero
    if (!height || !neck || !waist || height <= 0 || neck <= 0 || waist <= 0) return null; 

    let bfp;
    
    if (gender === 'male') {
        // Waist must be larger than neck for valid calculation
        if (waist <= neck) return null;
        
        // Formula for Men:
        // BFP = 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
        const waistMinusNeck = waist - neck;
        if (waistMinusNeck <= 0) return null;
        
        const log10_hn = Math.log10(height);
        const log10_wn = Math.log10(waistMinusNeck);

        // Using a simpler, common regression form for field calculation:
        bfp = 495 / (1.0324 - 0.19077 * log10_wn + 0.15456 * log10_hn) - 450;
    } else if (gender === 'female') {
        // Hip is required for women
        if (!hip || hip <= 0) return null; 
        
        // Waist + hip must be larger than neck
        if (waist + hip <= neck) return null;
        
        // Formula for Women:
        // BFP = 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
        const log10_hhw = Math.log10(height);
        const log10_whn = Math.log10(waist + hip - neck);
        
        bfp = 495 / (1.29579 - 0.35004 * log10_whn + 0.22100 * log10_hhw) - 450;
    } else {
        return null;
    }

    // Return BFP rounded to one decimal place (handle NaN)
    if (isNaN(bfp) || !isFinite(bfp)) return null;
    return Math.max(0, parseFloat(bfp.toFixed(1)));
};


const BodyFatCalculatorForm = () => {
    // 🎯 Assuming you've added addBFPLog to UserContext
    const { addBFPLog } = useUser(); 
    const navigate = useNavigate();

    const [gender, setGender] = useState('male');
    const [heightIn, setHeightIn] = useState('');
    const [weightLb, setWeightLb] = useState('');
    const [neckIn, setNeckIn] = useState('');
    const [waistIn, setWaistIn] = useState('');
    const [hipIn, setHipIn] = useState(''); // Only used for women

    const [calculatedBFP, setCalculatedBFP] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');

    const handleClear = () => {
        setHeightIn('');
        setWeightLb('');
        setNeckIn('');
        setWaistIn('');
        setHipIn('');
        setCalculatedBFP(null);
        setStatusMessage('');
        // We can keep 'gender' at 'male' or reset it if preferred: setGender('male');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatusMessage('');
        setCalculatedBFP(null);

        const h = parseFloat(heightIn);
        const n = parseFloat(neckIn);
        const w = parseFloat(waistIn);
        const p = parseFloat(hipIn);
        
        if (!h || !n || !w || h <= 0 || n <= 0 || w <= 0 || (gender === 'female' && p <= 0)) {
            setStatusMessage('Error: Please enter valid measurements for height, neck, and waist. Hip is also required for women.');
            return;
        }

        const bfp = calculateNavyBFP(gender, h, n, w, p);

        // Validate the result - allow wider range for different body types
        const isValidBFP = bfp !== null && !isNaN(bfp) && bfp >= 2 && bfp <= 50;
        
        if (isValidBFP) {
            setCalculatedBFP(bfp);
            
            // 🎯 Log the result to the context
            addBFPLog({
                date: new Date().toISOString().split('T')[0],
                bfp: bfp,
                method: 'Navy Circumference',
                details: { height: h, neck: n, waist: w, hip: p }
            });
            setStatusMessage(`✅ Body Fat Percentage calculated and logged: ${bfp}%`);
            
        } else {
            // Provide more helpful error message
            if (w <= n) {
                setStatusMessage('Error: Waist measurement must be larger than neck. Please re-measure.');
            } else if (bfp === null || isNaN(bfp)) {
                setStatusMessage('Error: Could not calculate BFP. Please check your measurements are in inches and are accurate.');
            } else {
                setStatusMessage('Error: Resulted in an unrealistic value. Please enter realistic measurements (in inches).');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-[#161B22] rounded-xl border border-gray-800 text-white mt-10">
            <h2 className="text-2xl font-bold mb-6">Body Fat Percentage Calculator</h2>
            <p className="text-sm text-gray-400 mb-4">Using U.S. Navy Circumference Method (Measurements must be in **Inches**).</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Gender Selector */}
                <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-400">Gender</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none"
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                {/* Measurements (Input type="number") */}
                <div className='grid grid-cols-2 gap-4'>
                    <InputGroup label="Height (in)" value={heightIn} setter={setHeightIn} />
                    <InputGroup label="Weight (lb)" value={weightLb} setter={setWeightLb} />
                    <InputGroup label="Neck (in)" value={neckIn} setter={setNeckIn} />
                    <InputGroup label="Waist (in)" value={waistIn} setter={setWaistIn} />
                    
                    {/* Hip Input (Conditional for Women) */}
                    {gender === 'female' && (
                        <InputGroup label="Hip (in)" value={hipIn} setter={setHipIn} />
                    )}
                </div>

                {/* Status Message */}
                {statusMessage && (
                    <p className={`text-sm ${statusMessage.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
                        {statusMessage}
                    </p>
                )}

                {/* Result Display */}
                {calculatedBFP !== null && (
                    <p className="text-xl font-bold text-indigo-400">Result: {calculatedBFP}%</p>
                )}
                <div className="flex gap-3 mt-6">
                
                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Calculate & Log BFP
                </button>
                <button
        type="button" // Important: use type="button" to prevent form submission
        onClick={handleClear}
        className="w-1/4 flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
        Clear
    </button>
    </div>
            </form>

            {/* Back to Dashboard Button */}
            <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="w-full mt-4 flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-transparent hover:bg-gray-700"
            >
                Back to Dashboard
            </button>
        </div>
    );
};

// Simple helper component for cleaner JSX
const InputGroup = ({ label, value, setter }) => (
    <div>
        <label className="block text-sm font-medium text-gray-400">{label}</label>
        <input
            type="number"
            step="0.1"
            min="0"
            value={value}
            onChange={(e) => setter(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
    </div>
);

export default BodyFatCalculatorForm;