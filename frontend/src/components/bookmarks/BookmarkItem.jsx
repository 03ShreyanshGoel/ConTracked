import { useContext, useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa"; // Import icons
import BookmarkContext from "../../context/bookmark/BookmarkContext";

const BookmarkItem = ({ contest }) => {
  const { toggleBookmark } = useContext(BookmarkContext);
  const [isBookmarked, setIsBookmarked] = useState(false); // State to track bookmark status

  const handleBookmarkToggle = () => {
    toggleBookmark(contest._id);
    setIsBookmarked((prev) => !prev); // Toggle bookmark state
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold">{contest.title}</h3>
        <p className="text-gray-600">{contest.date}</p>
      </div>

      <button
        onClick={handleBookmarkToggle}
        className="text-2xl text-gray-500 hover:text-red-500 transition"
        aria-label="Bookmark"
      >
        {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
      </button>
    </div>
  );
};

export default BookmarkItem;
