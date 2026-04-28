import React from "react";

export default function Footer() {
    return (
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: "0" }}>
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" style={{ padding: "48px 0 32px" }}>
                <div
                    className="flex flex-col md:flex-row justify-between items-start"
                    style={{ gap: "40px" }}
                >
                    {/* Brand */}
                    <div style={{ maxWidth: "260px" }}>
                        <div style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "22px",
                            fontWeight: 800,
                            letterSpacing: "0.04em",
                            color: "#F1F5F9",
                            textTransform: "uppercase",
                            marginBottom: "12px",
                        }}>
                            Kine<span style={{ color: "#3B82F6" }}>-Sync</span>
                            <span style={{
                                marginLeft: "6px",
                                fontSize: "10px",
                                fontWeight: 600,
                                letterSpacing: "0.18em",
                                color: "#3B82F6",
                                background: "rgba(59,130,246,0.12)",
                                border: "1px solid rgba(59,130,246,0.25)",
                                padding: "2px 7px",
                                borderRadius: "4px",
                                verticalAlign: "middle",
                            }}>AI</span>
                        </div>
                        <p style={{
                            fontFamily: "'Barlow', sans-serif",
                            fontSize: "14px",
                            lineHeight: 1.65,
                            color: "#475569",
                        }}>
                            Your AI-powered fitness companion for perfect form and better results.
                        </p>
                    </div>

                    {/* Links + Social */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "flex-start" }}>

                        {/* Nav links */}
                        <div style={{ display: "flex", gap: "32px" }}>
                            {["About Us", "Contact", "Privacy"].map(label => (
                                <a key={label} href="#" style={{
                                    fontFamily: "'Barlow', sans-serif",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    color: "#475569",
                                    textDecoration: "none",
                                    transition: "color 0.15s",
                                }}
                                onMouseEnter={e => e.target.style.color = "#94A3B8"}
                                onMouseLeave={e => e.target.style.color = "#475569"}
                                >{label}</a>
                            ))}
                        </div>

                        {/* Social icons */}
                        <div style={{ display: "flex", gap: "12px" }}>
                            {/* Twitter/X */}
                            <a href="#" style={{
                                width: "34px",
                                height: "34px",
                                borderRadius: "8px",
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#475569",
                                transition: "all 0.15s",
                                textDecoration: "none",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(59,130,246,0.3)"; e.currentTarget.style.color="#60A5FA"; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; e.currentTarget.style.color="#475569"; }}
                            >
                                <svg style={{ width: 15, height: 15 }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a href="#" style={{
                                width: "34px",
                                height: "34px",
                                borderRadius: "8px",
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#475569",
                                transition: "all 0.15s",
                                textDecoration: "none",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(59,130,246,0.3)"; e.currentTarget.style.color="#60A5FA"; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; e.currentTarget.style.color="#475569"; }}
                            >
                                <svg style={{ width: 15, height: 15 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <circle cx="12" cy="12" r="4"></circle>
                                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"></circle>
                                </svg>
                            </a>

                            {/* LinkedIn */}
                            <a href="#" style={{
                                width: "34px",
                                height: "34px",
                                borderRadius: "8px",
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#475569",
                                transition: "all 0.15s",
                                textDecoration: "none",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(59,130,246,0.3)"; e.currentTarget.style.color="#60A5FA"; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; e.currentTarget.style.color="#475569"; }}
                            >
                                <svg style={{ width: 15, height: 15 }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{
                borderTop: "1px solid rgba(255,255,255,0.05)",
                padding: "20px 0",
                textAlign: "center",
            }}>
                <span style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "13px",
                    color: "#334155",
                }}>
                    &copy; 2025 Kine-Sync AI. All rights reserved.
                </span>
            </div>
        </footer>
    );
}