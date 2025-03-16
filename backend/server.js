import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import cors package
import connectDB from "./config/db.js";
import routes from "./routes/index.js"; // Import main route file
import "./cron/fetchContests.js";
import "./cron/fetchLinks.js";
dotenv.config();
connectDB();

const app = express();

// Enable CORS for frontend (http://localhost:5173)
app.use(
    cors({
        origin: "http://localhost:5173", // Allow requests from frontend
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: "Content-Type,Authorization",
    })
);

app.use(express.json());
app.use("/api", routes); // Prefix all routes with /api

// Global Error Handling Middleware (Place this after routes)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
