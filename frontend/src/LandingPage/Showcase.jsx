import React from "react";

export default function Showcase() {
    return (
        <section id="progress-showcase" style={{ padding: "96px 0", background: "rgba(255,255,255,0.015)" }}>
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">

                <div className="section-label" style={{ justifyContent: "center" }}>
                    <span className="bg-blue-500 font-medium px-4 py-2 text-lg rounded-xl">✦ Dashboard Preview</span>
                </div>

                <h2 style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(36px, 5vw, 52px)",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    color: "#F1F5F9",
                    marginBottom: "56px",
                }}>
                    Your Progress, All in One Place
                </h2>

                {/* Image frame */}
                <div style={{ position: "relative", display: "inline-block", width: "100%", maxWidth: "860px" }}>

                    {/* Outer glow */}
                    <div style={{
                        position: "absolute",
                        inset: "-32px",
                        background: "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)",
                        borderRadius: "24px",
                        pointerEvents: "none",
                    }} />

                    {/* Browser chrome mockup */}
                    <div style={{
                        background: "#0E1420",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "14px",
                        overflow: "hidden",
                        boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(59,130,246,0.15)",
                        position: "relative",
                    }}>
                        {/* Fake browser bar */}
                        <div style={{
                            background: "#111827",
                            padding: "12px 16px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                        }}>
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
                            <div style={{
                                flex: 1,
                                background: "#1E293B",
                                borderRadius: "6px",
                                padding: "4px 12px",
                                marginLeft: "8px",
                                fontFamily: "'Barlow', sans-serif",
                                fontSize: "12px",
                                color: "#475569",
                                textAlign: "left",
                            }}>
                                app.kinesync.ai/dashboard
                            </div>
                        </div>

                        <img
                            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop"
                            alt="Dashboard"
                            style={{
                                width: "100%",
                                display: "block",
                                aspectRatio: "16/9",
                                objectFit: "cover",
                            }}
                            onError={e => {
                                e.target.src = "https://placehold.co/1000x500/1C212E/E5E7EB?text=Kine-Sync+Dashboard";
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}