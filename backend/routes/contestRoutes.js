import express from "express";
import { autoFetchSolutionLinks } from "../services/youtubeService.js";
import auth from "../middleware/auth.js"; // For admin-only access

const router = express.Router();

// ✅ Route to manually trigger the auto-fetch process
router.get("/fetch-solutions", auth, async (req, res) => {
    try {
        await autoFetchSolutionLinks();
        res.status(200).json({ message: "Solution links updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch solution links." });
    }
});

export default router;
