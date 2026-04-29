import React from "react";

export default function CTA() {
    return (
        <section id="cta" style={{ padding: "100px 0 120px", position: "relative", overflow: "hidden" }}>

            {/* Background glow */}
            <div style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,130,246,0.1) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            {/* Grid lines */}
            <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `
                    linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
                maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
                pointerEvents: "none",
            }} />

            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center" style={{ position: "relative" }}>

                <div className="section-label" style={{ justifyContent: "center" }}>
                    <span className="bg-blue-500 font-medium px-4 py-2 text-lg rounded-xl">♧ Get Started Today </span>
                </div>

                <h2 style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(40px, 6vw, 68px)",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    color: "#F1F5F9",
                    lineHeight: 1.05,
                    maxWidth: "720px",
                    margin: "0 auto 16px",
                }}>
                    Ready to Transform Your Workout?
                </h2>

                <p style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "17px",
                    color: "#64748B",
                    maxWidth: "400px",
                    margin: "0 auto 48px",
                    lineHeight: 1.6,
                }}>
                    Join thousands of athletes already training smarter with Kine-Sync AI.
                </p>

                <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                    <a
                        href="/signup"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            background: "#3B82F6",
                            color: "#fff",
                            padding: "16px 40px",
                            borderRadius: "10px",
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "18px",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            textDecoration: "none",
                            boxShadow: "0 0 40px rgba(59,130,246,0.4)",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background="#2563EB"; e.currentTarget.style.boxShadow="0 0 56px rgba(59,130,246,0.55)"; e.currentTarget.style.transform="translateY(-2px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background="#3B82F6"; e.currentTarget.style.boxShadow="0 0 40px rgba(59,130,246,0.4)"; e.currentTarget.style.transform="none"; }}
                    >
                        Sign Up Now — It's Free →
                    </a>
                </div>

                <p style={{
                    marginTop: "20px",
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "13px",
                    color: "#334155",
                }}>
                    No credit card required · Cancel anytime
                </p>
            </div>
        </section>
    );
}