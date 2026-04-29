import React from "react";

export default function Steps() {
    return (
        <section id="steps" className="py-20">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                
                {/* Enhanced Container: 
                  Added a subtle top-to-bottom gradient, overflow-hidden to contain the glow, 
                  and relative positioning to hold the absolute background elements. 
                */}
                <div className="relative bg-gradient-to-b from-[#111624] to-[#0B0F19] overflow-hidden rounded-3xl py-16 px-6 sm:px-12 text-center shadow-2xl border border-gray-800/60">
                    
                    {/* Background Enhancement 1: Reusing your grid pattern at a lower opacity */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

                    {/* Background Enhancement 2: A soft blue ambient glow at the top center */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-blue-600/10 blur-[80px] pointer-events-none rounded-full"></div>

                    {/* Content wrapper with z-10 to ensure text and cards sit above the glow/grid */}
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold text-white">
                            Achieve Perfect Form in 3 Simple Steps
                        </h2>

                        <div className="mt-16 grid md:grid-cols-3 gap-8">

                            {/* Card Enhancements: 
                              Made the background slightly transparent (bg-[#1C212E]/80) and 
                              added backdrop-blur-sm to create a premium frosted glass effect 
                              over the grid and glow. Added a soft glow to the icons.
                            */}
                            {/* Step 1 */}
                            <div className="card-bg rounded-xl p-8 bg-[#1C212E]/80 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/50 transition-all duration-300">
                                <div className="bg-blue-600/10 p-4 rounded-full inline-block shadow-[0_0_20px_rgba(37,99,235,0.15)]">
                                    <svg className="h-8 w-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2"
                                         viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                                    </svg>
                                </div>
                                <h3 className="mt-5 text-xl font-semibold text-white">Start Your Workout</h3>
                                <p className="mt-2 text-gray-400">
                                    Choose an exercise and simply press start. No equipment needed.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="card-bg rounded-xl p-8 bg-[#1C212E]/80 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/50 transition-all duration-300">
                                <div className="bg-blue-600/10 p-4 rounded-full inline-block shadow-[0_0_20px_rgba(37,99,235,0.15)]">
                                    <svg className="h-8 w-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2"
                                         viewBox="0 0 24 24">
                                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                                    </svg>
                                </div>
                                <h3 className="mt-5 text-xl font-semibold text-white">Get Real-Time Feedback</h3>
                                <p className="mt-2 text-gray-400">
                                    AI analyzes your movements and gives instant corrections.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="card-bg rounded-xl p-8 bg-[#1C212E]/80 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/50 transition-all duration-300">
                                <div className="bg-blue-600/10 p-4 rounded-full inline-block shadow-[0_0_20px_rgba(37,99,235,0.15)]">
                                    <svg className="h-8 w-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2"
                                         viewBox="0 0 24 24">
                                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                    </svg>
                                </div>
                                <h3 className="mt-5 text-xl font-semibold text-white">Track Your Progress</h3>
                                <p className="mt-2 text-gray-400">
                                    Visualize improvements with detailed analytics.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}