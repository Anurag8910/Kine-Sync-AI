import React, { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="w-full sticky top-0 z-50 bg-[#0B0F19]/80 backdrop-blur-md">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* The bottom border has been moved to this inner container */}
                <div className="flex justify-between items-center h-16 border-b border-gray-800">

                    <a href="/" className="text-2xl font-black text-white tracking-wide">
                        KINE-SYNC <span className="text-blue-600">AI</span> 
                    </a>

                    <nav className="hidden md:flex md:items-center md:space-x-8">
                        <a href="#features" className="text-gray-300 hover:text-white">Features</a>
                        <a href="#steps" className="text-gray-300 hover:text-white">How It Works</a>
                        <a href="/login" className="text-gray-300 hover:text-white">Log In</a>
                        <a href="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
                            Sign Up
                        </a>
                    </nav>

                    <button className="md:hidden text-gray-300" onClick={() => setOpen(!open)}>
                        {open ? "✖" : "☰"}
                    </button>
                </div>
            </div>

            {open && (
                <div className="md:hidden bg-[#1C212E]">
                    {/* The mobile menu was also updated to align with the container width */}
                    <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3">
                        <a href="#features" className="block py-3 text-gray-300 hover:text-white">Features</a>
                        <a href="#steps" className="block py-3 text-gray-300 hover:text-white">How It Works</a>
                        <a href="/login" className="block py-3 text-gray-300 hover:text-white">Log In</a>
                        <a href="/signup" className="block py-3 mt-2 bg-blue-600 text-white text-center rounded-lg font-semibold hover:bg-blue-700">
                            Sign Up
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}