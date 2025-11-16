import React from "react";
import { getActivityIcon } from "../icons/activityIcons";


// This now looks like the clean data you would get from your backend API.
const activitiesFromBackend = [
    {name:'Push-ups', time:'Today',duration:'15min'},
    {name: 'Running', time: 'yesterday', duration: '30 min' },
    {name: 'Yoga', time: 'oct 4, 2025', duration: '45 min' },
    {name: 'Weight Training', time: 'oct 2, 2025', duration: '20 min' },
    {name: 'Cycling', time: 'oct 1, 2025', duration: '55 min' },
    {name: 'Unknown Activity', time: 'sep 30, 2025', duration: '10 min' },
];

const RecentActivitiesCard = () => {
    return(
        <div className="bg-[#161B22] p-5 rounded-xl border border-gray-800 h-full">
            <h2 className="text-lg font-semibold text-white mb-4">Recent Activities</h2>
            <div className="space-y-4">
                {activitiesFromBackend.map((activity,index) => {
                  // 2. For each activity, we look up its icon and color dynamically.
                  const{icon:Icon,color} = getActivityIcon(activity.name);
                  return(
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="{`p-2 rounded-full mr-3 bg-gray-800`}">
                                {/* 3. We render the dynamically chosen icon component. */}
                                <Icon size = {20} className = {color}/>
                            </div>
                            <div>
                                <p className="font-medium text-white">{activity.name}</p>
                                <p className="text-xs text-gray-400">{activity.time}</p>
                            </div>
                        </div>
                        <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                        {activity.duration}
                        </span>
                    </div>
                  );  
                })}
            </div>
        </div>
    );
};

export default RecentActivitiesCard
