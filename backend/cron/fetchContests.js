import mongoose from "mongoose";
import dotenv from "dotenv";
import nodeCron from "node-cron";
import { fetchCodeforcesContests } from "../services/codeforcesService.js";
import { fetchCodeChefContests } from "../services/codechefService.js";
import { fetchLeetCodeContests } from "../services/leetcodeService.js";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("✅ MongoDB connected for contest updates");
    updateContests(); // Run fetch once when the server starts
}).catch(err => console.error("❌ MongoDB connection error:", err));

const updateContests = async () => {
    try {
        console.log("🔄 Fetching latest contests...");

        // ⏳ Fetch Codeforces contests
        console.time("Codeforces Fetch Time");
        console.log("⏳ Fetching Codeforces contests...");
        const codeforcesContests = await fetchCodeforcesContests();
        console.timeEnd("Codeforces Fetch Time");
        console.log(`✅ Codeforces contests fetched: ${codeforcesContests.length}`);
        console.log("🟢 Sample Codeforces Contests:", codeforcesContests.slice(0, 3)); // Log first 3 contests

        // ⏳ Fetch CodeChef contests
        console.time("CodeChef Fetch Time");
        console.log("⏳ Fetching CodeChef contests...");
        const codechefContests = await fetchCodeChefContests();
        console.timeEnd("CodeChef Fetch Time");
        console.log(`✅ CodeChef contests fetched: ${codechefContests.length}`);
        console.log("🟠 Sample CodeChef Contests:", codechefContests.slice(0, 3)); // Log first 3 contests

        // ⏳ Fetch LeetCode contests
        console.time("LeetCode Fetch Time");
        console.log("⏳ Fetching LeetCode contests...");
        const leetcodeContests = await fetchLeetCodeContests();
        console.timeEnd("LeetCode Fetch Time");
        console.log(`✅ LeetCode contests fetched: ${leetcodeContests.length}`);
        console.log("🔵 Sample LeetCode Contests:", leetcodeContests.slice(0, 3)); // Log first 3 contests

        console.log("✅ All contests updated successfully!");
    } catch (error) {
        console.error("❌ Error updating contests:", error);
    }
};

// **Schedule Cron Job: Runs every 6 hours**
nodeCron.schedule("0 */6 * * *", async () => {
    console.log("⏳ Running scheduled contest update...");
    await updateContests();
});
