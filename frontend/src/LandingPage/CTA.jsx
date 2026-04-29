import React from "react";

export default function CTA() {
    return (
        <section id="cta" className="py-20 md:py-32 bg-grid-pattern relative">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center justify-center">
                

                <h2 className="text-5xl md:text-7xl font-black text-white tracking-wide leading-tight uppercase">
                    READY TO
                    <br />
                    TRANSFORM YOUR
                    <br />
                    WORKOUT?
                </h2>
                
                <p className="mt-6 text-gray-400">
                    Join thousands of athletes already training smarter with Kine-Sync AI.
                </p>

                <a
                    href="/signup"
                    className="mt-10 inline-block bg-blue-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                >
                    SIGN UP NOW — IT'S FREE
                </a>
                
                <p className="mt-4 text-sm text-gray-500">
                    No credit card required · Cancel anytime
                </p>
            </div>
        </section>
    );
}