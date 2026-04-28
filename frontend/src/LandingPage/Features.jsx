import React from "react";

const features = [
    {
        title: "AI Form Correction",
        desc: "Get posture feedback with 33+ body point tracking.",
        icon: (
            <svg style={{ width: 22, height: 22 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
            </svg>
        ),
    },
    {
        title: "Personalized Dashboard",
        desc: "Track your progress with detailed analytics.",
        icon: (
            <svg style={{ width: 22, height: 22 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
        ),
    },
    {
        title: "Automated Rep Counting",
        desc: "AI counts every rep accurately.",
        icon: (
            <svg style={{ width: 22, height: 22 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="17 1 21 5 17 9"></polyline>
                <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
            </svg>
        ),
    },
    {
        title: "Diet & Nutrition Plans",
        desc: "Personalized meal plans for your goals.",
        icon: (
            <svg style={{ width: 22, height: 22 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8Z"></path>
            </svg>
        ),
    },
    {
        title: "Community Support",
        desc: "Join a vibrant community of fitness lovers.",
        icon: (
            <svg style={{ width: 22, height: 22 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
        ),
    },
    {
        title: "Privacy First",
        desc: "Your workout data is private & encrypted.",
        icon: (
            <svg style={{ width: 22, height: 22 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
        ),
    },
];

export default function Features() {
    return (
        <section id="features" style={{ padding: "96px 0" }}>
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">

                <div className="section-label" style={{ justifyContent: "center" }}>
                    
                    <span className="bg-blue-500 font-medium px-4 py-2 text-lg rounded-xl">✦ Features</span>
                </div>

                <h2 style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(36px, 5vw, 52px)",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    color: "#F1F5F9",
                    marginBottom: "16px",
                }}>
                    Everything You Need to Succeed
                </h2>

                <p style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "16px",
                    color: "#64748B",
                    marginBottom: "64px",
                    maxWidth: "480px",
                    margin: "0 auto 64px",
                    lineHeight: 1.6,
                }}>
                    A complete toolkit built around your performance — from movement analysis to nutrition.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: "20px" }}>
                    {features.map(({ title, desc, icon }, i) => (
                        <div
                            key={i}
                            className="card-bg hover:scale-110"
                            style={{
                                borderRadius: "14px",
                                padding: "28px",
                                textAlign: "left",
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            {/* Subtle top accent line */}
                            <div style={{
                                position: "absolute",
                                top: 0,
                                left: "28px",
                                right: "28px",
                                height: "1px",
                                background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)",
                            }} />

                            <div style={{
                                width: "46px",
                                height: "46px",
                                borderRadius: "10px",
                                background: "rgba(59,130,246,0.1)",
                                border: "1px solid rgba(59,130,246,0.18)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#60A5FA",
                                flexShrink: 0,
                            }}>
                                {icon}
                            </div>

                            <div>
                                <h3 style={{
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontSize: "19px",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.02em",
                                    color: "#F1F5F9",
                                    marginBottom: "8px",
                                }}>{title}</h3>
                                <p style={{
                                    fontFamily: "'Barlow', sans-serif",
                                    fontSize: "14px",
                                    lineHeight: 1.65,
                                    color: "#64748B",
                                }}>{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}