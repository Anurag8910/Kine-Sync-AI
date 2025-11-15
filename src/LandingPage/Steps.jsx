import React from "react";

export default function Steps() {
    return (
        <section id="steps" className="py-20 bg-[#111622]">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold text-white">
                    Achieve Perfect Form in 3 Simple Steps
                </h2>

                <div className="mt-16 grid md:grid-cols-3 gap-8">

                    {/* Step 1 */}
                    <div className="card-bg rounded-xl p-8">
                        <div className="bg-blue-600/10 p-4 rounded-full inline-block">
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
                    <div className="card-bg rounded-xl p-8">
                        <div className="bg-blue-600/10 p-4 rounded-full inline-block">
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
                    <div className="card-bg rounded-xl p-8">
                        <div className="bg-blue-600/10 p-4 rounded-full inline-block">
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
        </section>
    );
}
