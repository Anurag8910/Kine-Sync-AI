import React from "react";

import Navbar from "./Navbar";
import Hero from "./Hero";
import Steps from "./Steps";
import Features from "./Features";
import Showcase from "./Showcase";
import CTA from "./CTA";
import Footer from "./Footer";

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-[#080B12] text-[#F1F5F9] font-[Barlow] antialiased">
            <Navbar />
            <Hero />
            <Steps />
            <Features />
            <Showcase />
            <CTA />
            <Footer />
        </div>
    );
}