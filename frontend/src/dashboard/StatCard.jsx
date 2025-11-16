import React from "react";

const StatCard = ({icon:Icon , title , value}) => {
    return (
        <div className="bg-[#161B22] p-5 rounded-xl border border-gray-800 flex justify-between items-center">
            {/*Left side : Title and value */}
            <div>
                <p className="text-sm text-gray-400 mb-1">{title}</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{value}</p>
            </div>
            {/* Right side :Icon*/}
            <div className="bg-gray-800 p-3 rounded0full">
                <Icon className = "text-blue-400" size = {24}/>
            </div>
        </div>
    );
};

export default StatCard;