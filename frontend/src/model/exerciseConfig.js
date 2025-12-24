export const calculateAngle = (p1,p2,p3) => {
    const radians = Math.atan2(p3.y - p2.y,p3.x - p2.x) - Math.atan2(p1.y - p2.y,p1.x - p2.x);
    let angle = Math.abs((radians*180)/Math.PI);
    if(angle > 180.0) angle = 360 - angle;
    return angle;
};

export const EXERCISE_RULES = {
    bicep_curls: {
        name: "Bicep Curls",
        joints : [11,13,15],
        range: {
            max:160,
            min:60
        },
        checkForm: (landmarks) => {
            const shoulder = landmarks[11];
            const elbow = landmarks[13];
            if(Math.abs(shoulder.x - elbow.x) > 0.12) return "Keep Elbow Tucked!";
            return "Good Form";
        }
    },
    squats: {
        name: "Squats",
        joints : [23,25,27],
        range: {
            max:90,
            min:160
        },
        checkForm: (landmarks) => {
            const knee = landmarks[25];
            const ankle = landmarks[27];
            if(Math.abs(knee.x - ankle.x) > 0.1) return "Knees too far forward!";
            return "Good Depth";
        }
    }
};