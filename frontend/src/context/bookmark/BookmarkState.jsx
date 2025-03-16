import { useReducer, useEffect } from "react";
import axios from "../../utils/axiosConfig";

import BookmarkContext from "./BookmarkContext";
import bookmarkReducer from "./bookmarkReducer";
import { GET_BOOKMARKS, TOGGLE_BOOKMARK, BOOKMARK_ERROR } from "../types";

const BookmarkState = ({ children }) => {
  const initialState = {
    bookmarks: [],
    error: null,
  };

  const [state, dispatch] = useReducer(bookmarkReducer, initialState);

  // Axios Global Token Injection
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token in localStorage", token);
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // Get Bookmarks
  const getBookmarks = async () => {
    try {
      const res = await axios.get("/api/bookmarks");
      console.log("fetched response from /api/bookmarks", res.data);
      dispatch({ type: GET_BOOKMARKS, payload: res.data });
    } catch (error) {
      console.log("error fetching bookmarks", error.response?.data?.message);
      dispatch({
        type: BOOKMARK_ERROR,
        payload: error.response?.data?.message || "Error fetching bookmarks",
      });
    }
  };

  // Toggle Bookmark
  const toggleBookmark = async (contestId) => {
    try {
      await axios.post(`/api/bookmarks/${contestId}`);
      getBookmarks(); // Refresh bookmarks after toggling
    } catch (error) {
      dispatch({
        type: BOOKMARK_ERROR,
        payload: error.response?.data?.message || "Error toggling bookmark",
      });
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks: state.bookmarks,
        getBookmarks,
        toggleBookmark,
        error: state.error,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkState;
