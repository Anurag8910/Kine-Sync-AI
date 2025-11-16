const User = require("../model/userModel.js");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();
        return res.status(201).json({ message: "User added successfully" });
    } catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Wrong email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return res.status(200).json({
                message: "Login successful",
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                },
            });
        } else {
            return res.status(401).json({ message: "Wrong email or password" });
        }
    } catch (error) {
        console.error("Error while login:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = { signUp, login };