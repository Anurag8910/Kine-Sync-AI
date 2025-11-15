import React from "react";

export default function Footer() {
    return (
        <footer className="border-t border-gray-800 mt-12">

            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-center text-center md:text-left">

                    {/* Logo */}
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-xl font-bold text-white">Kine-Sync AI</h3>
                        <p className="mt-2 text-sm text-gray-400 max-w-xs">
                            Your AI-powered fitness companion for perfect form and better results.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-20">

                        <div className="flex space-x-8 text-sm text-gray-300">
                            <a href="#" className="hover:text-white">About Us</a>
                            <a href="#" className="hover:text-white">Contact</a>
                            <a href="#" className="hover:text-white">Privacy</a>
                        </div>

                        {/* Social Icons */}
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            {/* Twitter */}
                            <a href="#" className="text-gray-500 hover:text-white">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775..."></path>
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a href="#" className="text-gray-500 hover:text-white">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584..."></path>
                                </svg>
                            </a>

                            {/* LinkedIn */}
                            <a href="#" className="text-gray-500 hover:text-white">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5..."></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            <div className="border-t border-gray-800 mt-6 py-6 text-center text-gray-500 text-sm">
                &copy; 2025 Kine-Sync AI. All rights reserved.
            </div>

        </footer>
    );
}
