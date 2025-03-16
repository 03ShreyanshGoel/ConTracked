import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
    try {
        console.log("🔹 Register request received");
        const { username, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("✅ Hashed Password:", hashedPassword);

        // Create new user with hashed password
        const newUser = new User({ username, email, password: hashedPassword, role });
        console.log("✅ New User:", newUser);

        // Save user
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("❌ Error in register:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        console.log("🔹 Login request received");
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        console.log("✅ User found:", user);
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Debug password comparison
        console.log("Entered password:", password);
        console.log("Stored hashed password:", user.password);

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("✅ Password match result:", isMatch);

        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate token
        console.log("🔹 JWT SECRET:", process.env.JWT_SECRET);
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({
            token,
            user: { id: user._id, username: user.username, email, role: user.role }
        });
    } catch (error) {
        console.error("❌ Error in login:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
