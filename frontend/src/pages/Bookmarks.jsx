import { useContext, useEffect } from "react";
import BookmarkContext from "../context/bookmark/BookmarkContext";
import BookmarkItem from "../components/bookmarks/BookmarkItem";

const Bookmarks = () => {
  const { bookmarks, getBookmarks } = useContext(BookmarkContext);

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookmarks.length === 0 ? (
        <p className="text-center">No bookmarks found.</p>
      ) : (
        bookmarks.map((contest) => (
          <BookmarkItem key={contest._id} contest={contest} />
        ))
      )}
    </div>
  );
};

export default Bookmarks;
