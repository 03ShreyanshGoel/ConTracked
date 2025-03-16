import Bookmark from "../models/Bookmark.js";
import Contest from "../models/Contest.js";

// Toggle bookmark (Add/Remove)
export const toggleBookmark = async (req, res) => {
    try {
        const userId = req.user.id; // Get logged-in user ID
        console.log("🔹 User ID:", userId);
        const contestId = req.params.id;

        // Check if the contest exists
        const contest = await Contest.findById(contestId);
        if (!contest) return res.status(404).json({ message: "Contest not found" });

        // Check if the bookmark already exists
        const existingBookmark = await Bookmark.findOne({ user: userId, contest: contestId });

        if (existingBookmark) {
            // Remove bookmark if already exists
            await existingBookmark.deleteOne();
            return res.json({ message: "Bookmark removed" });
        } else {
            // Add bookmark if it doesn’t exist
            const newBookmark = new Bookmark({ user: userId, contest: contestId });
            await newBookmark.save();
            return res.status(201).json({ message: "Bookmark added" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get all bookmarks of a user
export const getUserBookmarks = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookmarks = await Bookmark.find({ user: userId }).populate("contest");

        res.json(bookmarks.map(b => b.contest)); // Return only contest details
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
