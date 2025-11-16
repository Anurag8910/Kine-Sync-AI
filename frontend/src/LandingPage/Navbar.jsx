import React, { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="w-full sticky top-0 z-50 bg-[#0B0F19]/80 backdrop-blur-md border-b border-gray-800">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <a href="/" className="text-2xl font-bold text-white">
                        Kine-Sync AI
                    </a>

                    <nav className="hidden md:flex md:items-center md:space-x-8">
                        <a href="#features" className="text-gray-300 hover:text-white">Features</a>
                        <a href="#steps" className="text-gray-300 hover:text-white">How It Works</a>
                        <a href="/login" className="text-gray-300 hover:text-white">Log In</a>
                        <a href="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
                            Sign Up for Free
                        </a>
                    </nav>

                    <button className="md:hidden text-gray-300" onClick={() => setOpen(!open)}>
                        {open ? "✖" : "☰"}
                    </button>
                </div>
            </div>

            {open && (
                <div className="md:hidden bg-[#1C212E] border-t border-gray-700">
                    <a href="#features" className="block px-4 py-3 text-gray-300">Features</a>
                    <a href="#steps" className="block px-4 py-3 text-gray-300">How It Works</a>
                    <a href="/login" className="block px-4 py-3 text-gray-300">Log In</a>
                    <a href="/signup" className="block px-4 py-3 bg-blue-600 text-white text-center font-semibold mt-2">
                        Sign Up for Free
                    </a>
                </div>
            )}
        </header>
    );
}
