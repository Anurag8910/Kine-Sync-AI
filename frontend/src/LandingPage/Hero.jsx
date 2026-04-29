import React from "react";

export default function Hero() {
    return (
        <section
            id="hero"
            style={{
                position: "relative",
                overflow: "hidden",
                padding: "96px 0 80px",
            }}
        >
            {/* Background grid */}
            <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `
                    linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
                maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
                pointerEvents: "none",
            }} />

            {/* Accent glow blob */}
            <div style={{
                position: "absolute",
                top: "-120px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "700px",
                height: "400px",
                background: "radial-gradient(ellipse, rgba(59,130,246,0.14) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" style={{ position: "relative" }}>
                <div className="grid md:grid-cols-2 gap-16 items-start">

                    {/* Text */}
                    <div className="text-center md:text-left">

                        <h1
                            className="hero-text-gradient animate-fade-in-up"
                            style={{
                                animationDelay: "100ms",
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: "clamp(48px, 7vw, 76px)",
                                fontWeight: 900,
                                lineHeight: 1.0,
                                letterSpacing: "-0.01em",
                                textTransform: "uppercase",
                                marginBottom: "24px",
                            }}
                        >
                            Your Personal AI Fitness Coach is Here.
                        </h1>

                        <p
                            className="animate-fade-in-up"
                            style={{
                                animationDelay: "300ms",
                                fontSize: "17px",
                                lineHeight: 1.7,
                                color: "#94A3B8",
                                maxWidth: "480px",
                                margin: "0 auto 36px",
                                fontFamily: "'Barlow', sans-serif",
                            }}
                        >
                            Stop guessing if your form is correct. Kine-Sync AI uses your device's webcam to provide
                            real-time, expert feedback.
                        </p>

                        <div className="animate-fade-in-up" style={{ animationDelay: "500ms", display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
                            <a
                                href="/signup"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    background: "#3B82F6",
                                    color: "#fff",
                                    padding: "14px 32px",
                                    borderRadius: "10px",
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontSize: "16px",
                                    fontWeight: 700,
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    textDecoration: "none",
                                    boxShadow: "0 0 32px rgba(59,130,246,0.35)",
                                    transition: "all 0.2s",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background="#2563EB"; e.currentTarget.style.boxShadow="0 0 48px rgba(59,130,246,0.5)"; e.currentTarget.style.transform="translateY(-1px)"; }}
                                onMouseLeave={e => { e.currentTarget.style.background="#3B82F6"; e.currentTarget.style.boxShadow="0 0 32px rgba(59,130,246,0.35)"; e.currentTarget.style.transform="none"; }}
                            >
                                Get Started →
                            </a>
                            <a
                                href="#steps"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    background: "rgba(255,255,255,0.05)",
                                    color: "#94A3B8",
                                    padding: "14px 28px",
                                    borderRadius: "10px",
                                    fontFamily: "'Barlow', sans-serif",
                                    fontSize: "15px",
                                    fontWeight: 500,
                                    textDecoration: "none",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    transition: "all 0.2s",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.color="#F1F5F9"; e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"; }}
                                onMouseLeave={e => { e.currentTarget.style.color="#94A3B8"; e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; }}
                            >
                                See How It Works
                            </a>
                        </div>
                    </div>

                    {/* Image */}
                    <div
                        className="relative animate-fade-in-up"
                        style={{ 
                            animationDelay: "200ms", 
                            position: "relative",
                            marginTop: "40px" 
                        }}
                    >
                        {/* Glow behind image */}
                        <div style={{
                            position: "absolute",
                            inset: "-20px",
                            background: "radial-gradient(ellipse, rgba(59,130,246,0.18) 0%, transparent 70%)",
                            borderRadius: "20px",
                            pointerEvents: "none",
                        }} />
                        <img
                            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop"
                            alt="Hero"
                            style={{
                                borderRadius: "14px",
                                width: "100%",
                                boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
                                position: "relative",
                                display: "block",
                            }}
                            onError={e => { e.target.src = "https://placehold.co/600x400/1C212E/E5E7EB?text=Live+AI+Session"; }}
                        />

                    </div>

                </div>
            </div>
        </section>
    );
}