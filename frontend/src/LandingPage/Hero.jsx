import React from "react";

export default function Hero() {
    return (
        <section id="hero" className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="grid md:grid-cols-2 gap-12 items-center">

                <div className="text-center md:text-left">
                    <h1 className="text-5xl md:text-6xl font-black hero-text-gradient leading-tight animate-fade-in-up"
                        style={{ animationDelay: "100ms" }}>
                        Your Personal AI Fitness Coach is Here.
                    </h1>

                    <p className="mt-6 text-lg text-gray-300 max-w-lg mx-auto md:mx-0 animate-fade-in-up"
                        style={{ animationDelay: "300ms" }}>
                        Stop guessing if your form is correct. Kine-Sync AI uses your device's webcam to provide
                        real-time, expert feedback.
                    </p>

                    <a href="/signup" className="mt-8 inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 animate-fade-in-up"
                        style={{ animationDelay: "500ms" }}>
                        Get Started for Free
                    </a>
                </div>

                <div className="relative hero-image-overlay animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                    <img
                        src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop"
                        alt="Hero"
                        className="rounded-lg shadow-2xl w-full"
                        onError={(e) => {
                            e.target.src = "https://placehold.co/600x400/1C212E/E5E7EB?text=Live+AI+Session";
                        }}
                    />
                </div>

            </div>
        </section>
    );
}
