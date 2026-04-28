import React from "react";
import {Bell,User,Settings} from 'lucide-react';

const DashboardHeader = ({userName}) => {
    return(
        <header className="flex justify-between items-center p-4">
            {/* Greeting Message */}
            <div className="text-left">
                <h1 className="text-3xl font-bold text-white">
                    Hello, {userName}
                </h1>
            </div>
            {/* Right-side Icons */}
            <div className="flex items-center space-x-4">
                {/* You can add functionality to these icons later, like onClick handlers */}
                <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors">
                    <Bell size={20}/>
                    {/* A small dot can be added here for notifications */}
                </button>
                <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors">
                    <Settings size={20}/>
                </button>
                <button className="p-2 rounded-full bg-blue-500 text-white">
                    <User size={20}/>
                </button>
            </div>
        </header>
    );
};

export default DashboardHeader;