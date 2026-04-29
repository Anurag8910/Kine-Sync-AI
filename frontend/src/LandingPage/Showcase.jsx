import React from "react";

export default function Showcase() {
    return (
        <section id="progress-showcase" className="py-16 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/5 blur-[100px] pointer-events-none rounded-full"></div>

            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    Your Progress, All in One Place
                </h2>
                <p className="mt-3 text-gray-400 text-base max-w-xl mx-auto">
                    A streamlined overview of your health and performance metrics, updated in real-time.
                </p>

                {/* Dashboard Mockup Container - Reduced max-width and padding */}
                <div className="mt-12 max-w-4xl mx-auto bg-[#0B0F19] rounded-xl border border-gray-800 shadow-2xl p-5 text-left overflow-hidden blue-glow">
                    
                    {/* Header Row: Stats - Reduced padding and text sizes */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
                        <div className="bg-[#1C212E] p-3 rounded-lg border border-gray-800">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Training Time</p>
                            <p className="text-xl font-bold text-white mt-0.5">1h 0m</p>
                            <div className="mt-2 w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                                <div className="bg-blue-600 h-full w-1/3"></div>
                            </div>
                        </div>
                        <div className="bg-[#1C212E] p-3 rounded-lg border border-gray-800">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Avg Sleep</p>
                            <p className="text-xl font-bold text-white mt-0.5">7.5h</p>
                            <div className="flex gap-1 mt-2">
                                {[...Array(7)].map((_, i) => (
                                    <div key={i} className={`h-1 flex-1 rounded-full ${i < 5 ? 'bg-indigo-500' : 'bg-gray-800'}`}></div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-[#1C212E] p-3 rounded-lg border border-gray-800">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Water Intake</p>
                            <p className="text-xl font-bold text-white mt-0.5">7/8 glasses</p>
                            <div className="flex gap-1 mt-2">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className={`h-2 w-1.5 rounded-sm ${i < 7 ? 'bg-blue-400' : 'bg-gray-800'}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area - Scaled down components */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        
                        {/* Left: Body Fat Gauge */}
                        <div className="space-y-4">
                            <div className="bg-[#1C212E] p-4 rounded-lg border border-gray-800">
                                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Body Fat</h4>
                                <div className="relative flex justify-center py-2">
                                    <svg className="w-24 h-12" viewBox="0 0 100 50">
                                        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#374151" strokeWidth="8" />
                                        <path d="M 10 50 A 40 40 0 0 1 50 10" fill="none" stroke="#2563EB" strokeWidth="8" />
                                    </svg>
                                    <div className="absolute bottom-0 text-center">
                                        <p className="text-lg font-bold text-white">15%</p>
                                        <p className="text-[9px] text-green-400 uppercase font-bold">Excellent</p>
                                    </div>
                                </div>
                                <button className="w-full mt-3 bg-blue-600/10 text-blue-400 text-[10px] py-1.5 rounded-md border border-blue-600/20 font-bold hover:bg-blue-600 hover:text-white transition-all uppercase">
                                    Update BFP
                                </button>
                            </div>
                        </div>

                        {/* Middle/Right: Weight Tracker - Reduced height and text */}
                        <div className="lg:col-span-2 bg-[#1C212E] p-4 rounded-lg border border-gray-800 flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Weight Tracker</h4>
                                <span className="text-[10px] text-gray-500">Target: 62 lbs</span>
                            </div>
                            
                            <div className="flex-grow flex items-end gap-2 h-24 px-1 border-b border-l border-gray-800/50">
                                {[35, 45, 40, 55, 50, 65, 60].map((h, i) => (
                                    <div key={i} className="flex-1 bg-gradient-to-t from-blue-600/10 to-blue-500/80 rounded-t-sm" style={{ height: `${h}%` }}></div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-2 px-1">
                                <span className="text-[9px] text-gray-600">Mon</span>
                                <span className="text-[9px] text-gray-600">Wed</span>
                                <span className="text-[9px] text-gray-600">Fri</span>
                                <span className="text-[9px] text-gray-600">Sun</span>
                            </div>
                            
                            <button className="w-full mt-4 bg-blue-600 text-white text-[11px] py-2 rounded-md font-bold uppercase tracking-wide">
                                Log New Weight
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}