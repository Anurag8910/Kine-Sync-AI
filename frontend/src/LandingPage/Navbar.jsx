import React, { useState, useEffect } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className="w-full sticky top-0 z-50"
            style={{
                background: scrolled
                    ? "rgba(8,11,18,0.92)"
                    : "rgba(8,11,18,0.6)",
                backdropFilter: "blur(16px)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                transition: "background 0.3s",
            }}
        >
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 " style={{ position: "relative" }}>

                    {/* Logo */}
                    <a href="/" className="hover:scale-110" style={{ textDecoration: "none" }}>
                        <span style={{
                            marginLeft: "30px",
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "38px",
                            fontWeight: 800,
                            letterSpacing: "0.04em",
                            color: "#F1F5F9",
                            textTransform: "uppercase",
                        }}>
                            Kine
                            <span style={{ color: "#3B82F6" }}>-Sync</span>
                            <span style={{
                                marginLeft: "6px",
                                fontSize: "16px",
                                fontWeight: 600,
                                letterSpacing: "0.18em",
                                color: "#3B82F6",
                                background: "rgba(59,130,246,0.12)",
                                border: "1px solid rgba(59,130,246,0.25)",
                                padding: "2px 7px",
                                borderRadius: "4px",
                                verticalAlign: "middle",
                            }}>AI</span>
                        </span>
                    </a>

                    {/* Desktop nav — centered links */}
                    <nav className="hidden md:flex md:items-center " style={{
                        position: "absolute",
                        marginLeft: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        gap: "32px",
                    }}>
                        {["#features", "#steps"].map((href, i) => (
                            <a className="hover:scale-110" key={i} href={href} style={{
                                fontFamily: "'Barlow', sans-serif",
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "#94A3B8",
                                textDecoration: "none",
                                letterSpacing: "0.02em",
                                transition: "color 0.15s",
                            }}
                            onMouseEnter={e => e.target.style.color = "#F1F5F9"}
                            onMouseLeave={e => e.target.style.color = "#94A3B8"}
                            >
                                {href === "#features" ? "Features" : "How It Works"}
                            </a>
                        ))}
                        <a href="/login" style={{
                            fontFamily: "'Barlow', sans-serif",
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#94A3B8",
                            textDecoration: "none",
                            transition: "color 0.15s",
                        }}
                        onMouseEnter={e => e.target.style.color = "#F1F5F9"}
                        onMouseLeave={e => e.target.style.color = "#94A3B8"}
                        >Log In</a>
                    </nav>

                    {/* CTA — pinned right */}
                    <a href="/signup" className="hidden md:inline-flex hover:scale-110" style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "14px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#fff",
                        background: "#3B82F6",
                        padding: "9px 22px",
                        borderRadius: "8px",
                        textDecoration: "none",
                        transition: "background 0.15s, box-shadow 0.15s",
                        boxShadow: "0 0 20px rgba(59,130,246,0.3)",
                    }}
                    onMouseEnter={e => { e.target.style.background="#2563EB"; e.target.style.boxShadow="0 0 28px rgba(59,130,246,0.5)"; }}
                    onMouseLeave={e => { e.target.style.background="#3B82F6"; e.target.style.boxShadow="0 0 20px rgba(59,130,246,0.3)"; }}
                    >
                        Sign Up Free
                    </a>

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden"
                        onClick={() => setOpen(!open)}
                        style={{ color: "#94A3B8", fontSize: "20px", background: "none", border: "none", cursor: "pointer" }}
                    >
                        {open ? "✖" : "☰"}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div style={{
                    background: "#0E1420",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    padding: "8px 0 16px",
                }}>
                    {[
                        { href: "#features", label: "Features" },
                        { href: "#steps",    label: "How It Works" },
                        { href: "/login",    label: "Log In" },
                    ].map(({ href, label }) => (
                        <a key={href} href={href} style={{
                            display: "block",
                            padding: "12px 24px",
                            color: "#94A3B8",
                            textDecoration: "none",
                            fontFamily: "'Barlow', sans-serif",
                            fontSize: "15px",
                        }}>{label}</a>
                    ))}
                    <div style={{ padding: "8px 24px 0" }}>
                        <a href="/signup" style={{
                            display: "block",
                            textAlign: "center",
                            background: "#3B82F6",
                            color: "#fff",
                            padding: "12px",
                            borderRadius: "8px",
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontWeight: 700,
                            fontSize: "15px",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            textDecoration: "none",
                        }}>Sign Up Free</a>
                    </div>
                </div>
            )}
        </header>
    );
}