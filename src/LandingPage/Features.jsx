import React from "react";

export default function Features() {
    return (
        <section id="features" className="py-20">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">

                <h2 className="text-4xl font-bold text-white">Everything You Need to Succeed</h2>

                <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Feature 1 */}
                    <div className="card-bg rounded-xl p-6 text-left">
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-600/10 p-3 rounded-lg">
                                <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor"
                                     strokeWidth="2" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <circle cx="12" cy="12" r="6"></circle>
                                    <circle cx="12" cy="12" r="2"></circle>
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white">AI Form Correction</h3>
                        </div>
                        <p className="mt-3 text-gray-400 text-sm">
                            Get posture feedback with 33+ body point tracking.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="card-bg rounded-xl p-6 text-left">
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-600/10 p-3 rounded-lg">
                                <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor"
                                     strokeWidth="2" viewBox="0 0 24 24">
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white">Personalized Dashboard</h3>
                        </div>
                        <p className="mt-3 text-gray-400 text-sm">
                            Track your progress with detailed analytics.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="card-bg rounded-xl p-6 text-left">
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-600/10 p-3 rounded-lg">
                                <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor"
                                     strokeWidth="2" viewBox="0 0 24 24">
                                    <polyline points="17 1 21 5 17 9"></polyline>
                                    <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white">Automated Rep Counting</h3>
                        </div>
                        <p className="mt-3 text-gray-400 text-sm">
                            AI counts every rep accurately.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="card-bg rounded-xl p-6 text-left">
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-600/10 p-3 rounded-lg">
                                <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor"
                                     strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8Z"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white">Diet & Nutrition Plans</h3>
                        </div>
                        <p className="mt-3 text-gray-400 text-sm">
                            Personalized meal plans for your goals.
                        </p>
                    </div>

                    {/* Feature 5 */}
                    <div className="card-bg rounded-xl p-6 text-left">
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-600/10 p-3 rounded-lg">
                                <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor"
                                     strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white">Community Support</h3>
                        </div>
                        <p className="mt-3 text-gray-400 text-sm">
                            Join a vibrant community of fitness lovers.
                        </p>
                    </div>

                    {/* Feature 6 */}
                    <div className="card-bg rounded-xl p-6 text-left">
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-600/10 p-3 rounded-lg">
                                <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor"
                                     strokeWidth="2" viewBox="0 0 24 24">
                                    <rect x="3" y="11" width="18" height="11" rx="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white">Privacy First</h3>
                        </div>
                        <p className="mt-3 text-gray-400 text-sm">
                            Your workout data is private & encrypted.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
