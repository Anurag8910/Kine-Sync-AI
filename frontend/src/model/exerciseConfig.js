// exerciseConfig.js

export const calculateAngle = (p1, p2, p3) => {
    const radians = Math.atan2(p3.y - p2.y, p3.x - p2.x) - Math.atan2(p1.y - p2.y, p1.x - p2.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) angle = 360 - angle;
    return angle;
};

export const EXERCISE_RULES = {
    bicep_curls: {
        id: "bicep_curls",
        name: "Bicep Curls",
        countType: "flexion", // Count when angle gets SMALL (< min)
        joints: [11, 13, 15], // Shoulder, Elbow, Wrist
        range: {
            max: 160, // Relaxed state (Down)
            min: 50   // Effort state (Up)
        },
        checkForm: (landmarks) => {
            const shoulder = landmarks[11];
            const elbow = landmarks[13];
            if (Math.abs(shoulder.x - elbow.x) > 0.12) return "Keep Elbow Tucked!";
            return "Good Form";
        }
    },
    squats: {
        id: "squats",
        name: "Squats",
        countType: "extension",
        joints: [23, 25, 27], // Hip, Knee, Ankle
        range: {
            max: 160, // Standing straight
            min: 100  // Increased from 90 to 100 (easier to trigger for most users)
        },
        checkForm: (landmarks) => {
            const hip = landmarks[23];
            const knee = landmarks[25];
            const ankle = landmarks[27];

            // 1. Check Knee over Toes
            if (Math.abs(knee.x - ankle.x) > 0.2) return "Knees too far forward!";

            // 2. Check Depth (Hip should go below or level with knee)
            // If Hip Y is less than Knee Y, it means the hip is still ABOVE the knee
            if (hip.y < knee.y - 0.05) return "Go Lower!";

            return "Good Form";
        }
    },
    pushups: {
        id:"pushups",
        name: "Push Ups",
        countType: "extension",
        joints:[11,13,15],
        range: {
            max:160,
            min:85
        },
        checkForm:(landmarks) => {
            const shoulder = landmarks[11];
            const hip = landmarks[23];
            const ankle = landmarks[27];

            const bodyAngle = calculateAngle(shoulder,hip,ankle);

            if(bodyAngle < 160) return "Fix back(Sagging)!";
            if(bodyAngle > 160) return "Fix Back (Too High)!";
            return "Good Form";
        }
    }
};