import { useContext, useEffect, useState } from "react";
import { FaRegBookmark, FaBookmark, FaYoutube } from "react-icons/fa";
import { SiCodeforces, SiLeetcode, SiCodechef } from "react-icons/si";
import ContestContext from "../../context/contest/ContestContext";
import BookmarkContext from "../../context/bookmark/BookmarkContext"; // <-- Import BookmarkContext
import AuthContext from "../../context/auth/AuthContext";
import { calculateTimeRemaining } from "../../utils/timeUtils.js";

const platformIcons = {
  codeforces: <SiCodeforces className="text-3xl text-gray-700" />,
  leetcode: <SiLeetcode className="text-3xl text-gray-700" />,
  codechef: <SiCodechef className="text-3xl text-gray-700" />,
};

const ContestItem = ({ contest, isPast }) => {
  const { uploadSolution } = useContext(ContestContext);
  const { toggleBookmark, getUserBookmarks } = useContext(BookmarkContext); // Use BookmarkContext
  const { role } = useContext(AuthContext);

  const [solutionLink, setSolutionLink] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Fetch bookmark status when component mounts
  useEffect(() => {
    const fetchBookmarks = async () => {
      const bookmarks = await getUserBookmarks();
      setIsBookmarked(bookmarks.some((item) => item._id === contest._id));
    };
    fetchBookmarks();
  }, [contest._id, getUserBookmarks]);

  const handleUpload = () => {
    if (solutionLink.trim()) {
      uploadSolution(contest.id, solutionLink);
      setSolutionLink("");
    }
  };

  const handleBookmarkToggle = async () => {
    await toggleBookmark(contest._id); // Save/remove bookmark in DB
    setIsBookmarked((prev) => !prev); // Optimistically toggle UI
  };

  return (
    <tr className="hover:bg-gray-50 transition duration-200 border-b border-gray-300">
      <td className="p-2 text-center">{contest.title}</td>
      <td className="p-2 text-center">
        {new Date(contest.startTime).toLocaleString()}
      </td>
      {!isPast && (
        <td className="p-2 text-center">
          {calculateTimeRemaining(contest.startTime, contest.endTime)}
        </td>
      )}
      <td className="p-2 text-center">
        <div className="flex justify-center items-center">
          {platformIcons[contest.platform.toLowerCase()] || (
            <span className="text-gray-500">?</span>
          )}
        </div>
      </td>
      {isPast && (
        <td className="p-2 text-center">
          <button
            onClick={handleBookmarkToggle}
            className="text-2xl text-black hover:text-black transition"
            aria-label="Bookmark"
          >
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </td>
      )}
      {isPast && (
        <td className="p-2 text-center">
          <div className="flex justify-center items-center">
            {contest.solutionLink ? (
              <a
                href={contest.solutionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-600 transition duration-200"
                aria-label="YouTube Solution"
              >
                <FaYoutube className="text-3xl" />
              </a>
            ) : (
              <FaYoutube className="text-3xl text-gray-400" />
            )}
          </div>
        </td>
      )}

      {isPast && role === "admin" && (
        <td className="p-2 text-center">
          <input
            type="text"
            value={solutionLink}
            onChange={(e) => setSolutionLink(e.target.value)}
            placeholder="Enter solution URL"
            className="p-1 border border-gray-300 rounded text-center"
          />
          <button
            onClick={handleUpload}
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
          >
            Upload
          </button>
        </td>
      )}
    </tr>
  );
};

export default ContestItem;
