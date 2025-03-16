import express from "express";
import authRoutes from "./auth.js";
import contestRoutes from "./contests.js";
import bookmarkRoutes from "./bookmarks.js";

const router = express.Router();

router.use("/auth", authRoutes);         // Routes for authentication (Login/Register)
router.use("/contests", contestRoutes);  // Routes for contests (Fetching, Admin solution updates)
router.use("/bookmarks", bookmarkRoutes); // Routes for user bookmarks (Get, Toggle)

export default router;
