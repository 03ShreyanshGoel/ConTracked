import { useState, useContext, useEffect } from "react";
import UpcomingContests from "../components/contests/UpcomingContests";
import PastContests from "../components/contests/PastContests";
import ContestFilter from "../components/contests/ContestFilter";
import ContestContext from "../context/contest/ContestContext";
import AuthContext from "../context/auth/AuthContext"; // Import AuthContext for username

const Contests = () => {
  const { getContests } = useContext(ContestContext);
  const { user } = useContext(AuthContext); // Access user data

  const username = user?.username || "User"; // Fallback to "User" if no username found

  // Shared state for platform filters
  const [selectedPlatforms, setSelectedPlatforms] = useState([
    "CodeChef",
    "Codeforces",
    "LeetCode",
  ]);

  // Fetch contests whenever the selected platforms change
  useEffect(() => {
    getContests(selectedPlatforms);
  }, [selectedPlatforms]);

  return (
    <div className="p-8 space-y-10">
      <p className="text-2xl font-extralight text-gray-800 capitalize">
        <p> Hi, {username}!</p>
        <p>Track Your Contests Here!</p>
      </p>

      <div className="border-t border-gray-300 pt-4">
        <h2 className="text-xl font-medium mb-4 text-black">Filter</h2>
        <ContestFilter
          selectedPlatforms={selectedPlatforms}
          setSelectedPlatforms={setSelectedPlatforms}
        />
      </div>

      <div className="border-t border-gray-300 pt-4">
        <h2 className="text-2xl font-medium mb-4 text-black">
          Upcoming Contests
        </h2>
        <UpcomingContests selectedPlatforms={selectedPlatforms} />
      </div>

      <div className="border-t border-gray-300 pt-4">
        <h2 className="text-2xl font-medium mb-4 text-black">
          Past Contests (Last Week)
        </h2>
        <PastContests selectedPlatforms={selectedPlatforms} />
      </div>
    </div>
  );
};

export default Contests;
