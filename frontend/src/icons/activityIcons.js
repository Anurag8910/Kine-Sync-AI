import { Dumbbell, Footprints, HeartPulse, Zap, Bike, Droplets, HelpCircle } from "lucide-react";

const iconMap = {
    'push-ups': {icon:HeartPulse, color:'text-pink-400'},
    'Running': {icon:Footprints, color:'text-green-400'},
    'Weight Training': {icon:Dumbbell, color:'text-yellow-400'},
    'Yoga': {icon:Zap, color:'text-purple-400'},
    'Cycling': {icon:Bike, color:'text-sky-400'},
    'Hydration': {icon:Droplets, color:'text-blue-400'},
};

const defaultIcon = {icon: HelpCircle,color:'text-gray-400'}

export const getActivityIcon = (activityName) => {
    return iconMap[activityName] || defaultIcon;
};