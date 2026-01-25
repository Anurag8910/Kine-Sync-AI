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
    },
    plank: {
        id:"plank",
        name:"Plank",
        countType:"time",
        joints : [11,23,27],
        range: {
            min:160,
            max:195
        },
        checkForm: (landmarks) => {
            const shoulder = landmarks[11];
            const hip = landmarks[23];
            const ankle = landmarks[27];

            const angle = calculateAngle(shoulder,hip,ankle);
            if(angle < 160) return "Lower Hips!";
            if(angle > 195) return "Lift Hips(Sagging)";
            return "Good Form"
        }
    },
    lunges: {
        id: "lunges",
        name: "Lunges",
        countType: "extension", // Starts standing, goes down, comes back up
        joints: [23, 25, 27],   // Track Left Leg (Hip, Knee, Ankle)
        range: {
            max: 160, // Standing straight
            min: 90   // Knee bent at 90 degrees
        },
        checkForm: (landmarks) => {
            const shoulder = landmarks[11];
            const hip = landmarks[23];
            const knee = landmarks[25];
            const ankle = landmarks[27];

            // 1. Check if knee passes toe (Bad for knees)
            // In a lunge, the shin should be vertical
            if (knee.x - ankle.x > 0.1) return "Knee passing toe!";

            // 2. Check Torso Alignment (Should act differently than squats)
            // In a lunge, your upper body should be vertical, not leaning forward.
            // We check if the Shoulder X is too far from Hip X
            if (Math.abs(shoulder.x - hip.x) > 0.15) return "Keep torso upright!";

            return "Good Form";
        }
    },
    glute_bridge: {
        id: "glute_bridge",
        name: "Glute Bridge",
        countType: "extension", // Counts when hips extend (straighten)
        joints: [11, 23, 25],   // Shoulder, Hip, Knee
        range: {
            max: 170, // Top of bridge (straight body)
            min: 135  // Bottom (hips on floor)
        },
        checkForm: (landmarks) => {
            const knee = landmarks[25];
            const ankle = landmarks[27];
            
            // 1. Check Shin Angle (Shins should be roughly vertical at the top)
            // If feet are too far forward, x distance between knee and ankle increases
            if (Math.abs(knee.x - ankle.x) > 0.15) return "Bring heels closer!";
            
            // 2. Check Hyperextension
            // We can't easily check back arching without more points, 
            // but we can ensure they aren't barely lifting.
            const shoulder = landmarks[11];
            const hip = landmarks[23];
            
            // If hip is significantly lower than the line between shoulder and knee
            // (Basic geometry check implied by the main angle, but good for feedback)
            if (hip.y > knee.y) return "Lift Hips Higher!"; // Y increases downwards
            
            return "Good Form";
        }
    }
};