import express from "express";
import { getUserBookmarks, toggleBookmark } from "../controllers/bookmarkController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getUserBookmarks); // Get user’s bookmarked contests
router.post("/:id", auth, toggleBookmark); // Toggle (add/remove) contest bookmark

export default router;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZDU5MDU2ZGY1MzI2ZDYzNWEyOWQ3ZiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQyMDQ5Mzc3LCJleHAiOjE3NDI2NTQxNzd9.-aMglkJLsrJwnbREQ825xdj_yDpk5NMvy0bGQuiLF3Y
