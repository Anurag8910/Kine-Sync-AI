import React from "react";

export default function Showcase() {
    return (
        <section id="progress-showcase" className="py-20">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold text-white">
                    Your Progress, All in One Place
                </h2>

                <div className="mt-12">
                    <img
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop"
                        alt="Dashboard"
                        className="rounded-lg shadow-2xl blue-glow w-full max-w-3xl mx-auto object-cover aspect-video"
                        onError={(e) => {
                            e.target.src =
                                "https://placehold.co/1000x500/1C212E/E5E7EB?text=Kine-Sync+Dashboard";
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
