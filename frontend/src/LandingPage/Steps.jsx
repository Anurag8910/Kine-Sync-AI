import React from "react";

const steps = [
    {
        num: "01",
        title: "Start Your Workout",
        desc: "Choose an exercise and simply press start. No equipment needed.",
        icon: (
            <svg style={{ width: 28, height: 28 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
            </svg>
        ),
    },
    {
        num: "02",
        title: "Get Real-Time Feedback",
        desc: "AI analyzes your movements and gives instant corrections.",
        icon: (
            <svg style={{ width: 28, height: 28 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
        ),
    },
    {
        num: "03",
        title: "Track Your Progress",
        desc: "Visualize improvements with detailed analytics.",
        icon: (
            <svg style={{ width: 28, height: 28 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            </svg>
        ),
    },
];

export default function Steps() {
    return (
        <section id="steps" style={{ padding: "96px 0", background: "rgba(255,255,255,0.015)" }}>
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">

                <div className="section-label" style={{ justifyContent: "center" }}>
                    <span className="bg-blue-500 font-medium px-4 py-2 text-lg rounded-xl">♧ How It Works</span>
                </div>

                <h2 style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(36px, 5vw, 52px)",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    color: "#F1F5F9",
                    marginBottom: "64px",
                }}>
                    Perfect Form in 3 Simple Steps
                </h2>

                <div className="grid md:grid-cols-3" style={{ gap: "24px", position: "relative" }}>

                    {/* Connector line (desktop) */}
                    <div style={{
                        position: "absolute",
                        top: "52px",
                        left: "calc(16.66% + 24px)",
                        right: "calc(16.66% + 24px)",
                        height: "1px",
                        background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.3) 30%, rgba(59,130,246,0.3) 70%, transparent)",
                        display: "none", // shown via media query below — using inline style hack
                    }} className="steps-connector" />

                    {steps.map(({ num, title, desc, icon }, i) => (
                        <div
                            key={i}
                            className="card-bg hover:scale-110"
                            style={{
                                borderRadius: "16px",
                                padding: "40px 32px",
                                textAlign: "left",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            {/* Step number watermark */}
                            <div style={{
                                position: "absolute",
                                top: "-10px",
                                right: "20px",
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: "80px",
                                fontWeight: 900,
                                color: "rgba(59,130,246,0.25)",
                                lineHeight: 1,
                                userSelect: "none",
                            }}>{num}</div>

                            {/* Icon */}
                            <div style={{
                                width: "56px",
                                height: "56px",
                                borderRadius: "12px",
                                background: "rgba(59,130,246,0.1)",
                                border: "1px solid rgba(59,130,246,0.2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#60A5FA",
                                marginBottom: "24px",
                            }}>
                                {icon}
                            </div>

                            {/* Step label */}
                            <div style={{
                                fontFamily: "'Barlow', sans-serif",
                                fontSize: "11px",
                                fontWeight: 600,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                color: "#3B82F6",
                                marginBottom: "8px",
                            }}>Step {num}</div>

                            <h3 style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: "22px",
                                fontWeight: 700,
                                color: "#F1F5F9",
                                letterSpacing: "0.01em",
                                textTransform: "uppercase",
                                marginBottom: "12px",
                            }}>{title}</h3>

                            <p style={{
                                fontFamily: "'Barlow', sans-serif",
                                fontSize: "15px",
                                lineHeight: 1.65,
                                color: "#64748B",
                            }}>{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}