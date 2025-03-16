import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
    try {
        console.log("🔹 Auth Middleware Executed");

        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            console.error("❌ No Token Provided");
            return res.status(401).json({ message: "Access Denied: No Token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            console.error("❌ Invalid Token");
            return res.status(401).json({ message: "Invalid Token" });
        }

        console.log(`✅ User Authenticated: ${req.user.username} (Admin: ${req.user.role === "admin"})`);
        next();
    } catch (error) {
        console.error("❌ Error in Auth Middleware:", error.message);
        res.status(401).json({ message: "Invalid Token" });
    }
};

export default auth;
