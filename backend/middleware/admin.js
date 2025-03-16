const admin = (req, res, next) => {
    console.log("🔐 Checking Admin Access...");

    if (!req.user) {
        console.error("❌ No User Found in Request");
        return res.status(403).json({ message: "Access Denied: No User Data" });
    }

    console.log(`👤 User Found: ${req.user.username}, Role: ${req.user.role}`);

    if (req.user.role !== "admin") {
        console.error(`❌ Access Denied: ${req.user.username} is not an admin`);
        return res.status(403).json({ message: "Access Denied: Admin Only" });
    }

    console.log(`✅ Admin Verified: ${req.user.username}`);
    next();
};

export default admin;
