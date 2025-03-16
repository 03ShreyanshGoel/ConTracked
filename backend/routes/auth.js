import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register); // User Registration
router.post("/login", login); // User Login

export default router;
