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
        },
        info: {
            imageUrl: "/assets/biceps.jpg", // Uses your existing image
            steps: [
                "Camera Setup: Stand sideways so the camera has a clear profile view of your active arm.",
                "Stand up straight with your feet shoulder-width apart and arms fully extended downwards.",
                "Keep your elbows tucked in close to your torso. Do not let them swing forward or backward.",
                "Curl the weight upward until your biceps are fully contracted and the weight is at shoulder level.",
                "Slowly lower the weight back down to the starting position to complete one rep."
            ]
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
        },
        info: {

            imageUrl: "/assets/squat-guide.gif", 
            steps: [
                "Stand with feet shoulder-width apart, toes slightly out.",
                "Keep your chest upright and look straight ahead.",
                "Initiate movement by sending hips back, then bending knees.",
                "Go down until thighs are parallel to the floor (or slightly below).",
                "Drive back up through your heels to the starting position."
            ]
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
        },
        info: {
            imageUrl: "/assets/PU.jpg", // You can use your existing image or a new GIF
            steps: [
                "Camera Setup: Place your device on the floor to capture your full side profile.",
                "Start in a high plank position with your hands slightly wider than shoulder-width.",
                "Keep your body in a straight line from your head to your heels (engage your core!).",
                "Lower your body until your elbows are at a 90-degree angle.",
                "Push back up to the starting position until your arms are fully extended."
            ]
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
        },
        info: {
            imageUrl: "/assets/pla.jpg", // Uses your existing image
            steps: [
                "Camera Setup: Place your device on the floor so the AI can see your full side profile.",
                "Rest your weight on your forearms and your toes, with elbows directly beneath your shoulders.",
                "Form a perfectly straight line from your shoulders, through your hips, to your ankles.",
                "Engage your core and squeeze your glutes. Do not let your hips sag or lift too high.",
                "Hold steady! The AI timer will ONLY count up while your form is correct."
            ]
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
        },
        info: {
            imageUrl: "/assets/lung.jpg", // Uses your existing image
            steps: [
                "Camera Setup: Stand sideways to the camera. For the best AI tracking, place your Left Leg forward.",
                "Start in a split stance with your torso perfectly upright and hands on your hips or by your side.",
                "Lower your body by dropping your back knee straight down toward the floor.",
                "Keep going until your front knee is bent at a 90-degree angle (do not let it pass your toes!).",
                "Push through the heel of your front foot to return to the starting position."
            ]
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
        },
        info: {
            imageUrl: "/assets/GluteBridge.jpg", // Uses your existing image
            steps: [
                "Camera Setup: Place your device completely on the floor to capture a clear side profile of your body.",
                "Lie flat on your back with your knees bent and feet flat on the floor, hip-width apart.",
                "Keep your arms resting at your sides and your heels close enough to touch with your fingertips.",
                "Squeeze your glutes and push through your heels to lift your hips toward the ceiling.",
                "Hold at the top when your body forms a straight line from shoulders to knees to count the rep!"
            ]
        }
    },
    situps: {
        id: "situps",
        name: "Sit Ups",
        countType: "flexion", // Count when body folds (angle gets SMALL)
        joints: [11, 23, 25], // Shoulder, Hip, Knee
        range: {
            max: 150, // Lying flat (Down state)
            min: 80   // Sitting up (Up state)
        },
        checkForm: (landmarks) => {
            const shoulder = landmarks[11];
            const hip = landmarks[23];
            const knee = landmarks[25];

            // 1. Check if they are actually lying down first (Hip Y should be close to Shoulder Y or below)
            // Note: In visual coordinates, Y increases downwards.
            
            // 2. Simple Neck/Chin tuck check (Ear vs Shoulder)
            // If the ear is too far ahead of the shoulder, they might be straining their neck.
            const ear = landmarks[7];
            if ((ear.x - shoulder.x) > 0.15) return "Don't pull your neck!";
            
            return "Good Form";
        },
        info: {
            imageUrl: "/assets/su.jpg", // Uses your existing image
            steps: [
                "Camera Setup: Place your device on the floor to capture a clear side profile of your body.",
                "Lie flat on your back with your knees bent and feet firmly planted on the floor.",
                "Cross your arms over your chest or place your hands lightly behind your ears (do not pull your neck!).",
                "Engage your core to lift your upper body off the floor until your chest is near your thighs.",
                "Lower yourself back down in a controlled motion until your shoulder blades touch the floor to complete the rep."
            ]
        }
    },
    shoulder_press: {
        id: "shoulder_press",
        name: "Shoulder Press",
        countType: "extension", // Count when arms straighten UP
        joints: [11, 13, 15],   // Shoulder, Elbow, Wrist
        range: {
            max: 160, // Arms straight overhead
            min: 90   // Arms bent at shoulders (Start position)
        },
        checkForm: (landmarks) => {
            const nose = landmarks[0];
            const shoulder = landmarks[11];
            const elbow = landmarks[13];

            // 1. Check if elbows are dropping too low
            if (elbow.y > shoulder.y + 0.1) return "Elbows too low!";

            // 2. Check if arms are uneven (using Y coordinate difference)
            // (You could compare left vs right if tracking both sides)
            
            // 3. Posture check (Leaning back too much?)
            // If nose X is behind shoulder X significantly
            if (nose.x < shoulder.x - 0.1) return "Don't lean back!";

            return "Good Form";
        },
        info: {
            imageUrl: "/assets/SP.jpg", // Uses your existing image
            steps: [
                "Camera Setup: Stand sideways to the camera. Step far enough back so your hands remain in frame when fully extended upward!",
                "Stand tall with your feet shoulder-width apart, holding the weights at shoulder level.",
                "Brace your core and keep your back perfectly straight. Do not lean backward as you lift.",
                "Press the weights straight up overhead until your arms are fully extended.",
                "Slowly lower the weights back down to the starting position at your shoulders to count the rep."
            ]
        }
    }
};