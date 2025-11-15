import React from "react";
import "./style.css";

import Navbar from "./Navbar";
import Hero from "./Hero";
import Steps from "./Steps";
import Features from "./Features";
import Showcase from "./Showcase";
import CTA from "./CTA";
import Footer from "./Footer";

export default function LandingPage() {
    return (
        <div className="bg-[#0B0F19] text-white">
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
