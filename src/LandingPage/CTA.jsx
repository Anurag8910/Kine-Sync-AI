import React from "react";

export default function CTA() {
    return (
        <section id="cta" className="py-20 md:py-32">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">

                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    Ready to Transform Your Workout?
                </h2>

                <a
                    href="/signup"
                    className="mt-14 inline-block bg-blue-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                >
                    Sign Up Now
                </a>
            </div>
        </section>
    );
}
