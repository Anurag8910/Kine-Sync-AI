
const {prisma} = require("../DB/db.config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required", data: null });
    }
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists", data: null });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
        return res.status(201).json({ success: true, message: "User added successfully", data: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({ success: false, message: "Server error", data: null });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required", data: null });
    }
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ success: false, message: "Wrong email or password", data: null });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Wrong email or password", data: null });
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token,
                user: { id: user.id, name: user.name, email: user.email },
            },
        });
    } catch (error) {
        console.error("Error while login:", error);
        return res.status(500).json({ success: false, message: "Server error", data: null });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: { profile: true, metrics: true },
        });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found", data: null });
        }
        res.json({ success: true, message: "User fetched", data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", data: null });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { age, gender, heightCm, currentWeightKg, mainGoal, activityLevel } = req.body;
        let profile = await prisma.profile.findUnique({ where: { userId } });
        if (profile) {
            profile = await prisma.profile.update({
                where: { userId },
                data: { age, gender, heightCm, currentWeightKg, mainGoal, activityLevel },
            });
        } else {
            profile = await prisma.profile.create({
                data: { userId, age, gender, heightCm, currentWeightKg, mainGoal, activityLevel },
            });
        }
        res.json({ success: true, message: "Profile updated", data: profile });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update profile", data: null });
    }
};

module.exports = { signUp, login, getMe, updateProfile };