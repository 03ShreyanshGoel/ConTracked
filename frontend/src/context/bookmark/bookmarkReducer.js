import { GET_BOOKMARKS, TOGGLE_BOOKMARK, BOOKMARK_ERROR } from "../types";

const bookmarkReducer = (state, action) => {
    switch (action.type) {
        case GET_BOOKMARKS:
            return {
                ...state,
                bookmarks: action.payload,
            };
        case TOGGLE_BOOKMARK:
            const exists = state.bookmarks.includes(action.payload);

            return {
                ...state,
                bookmarks: exists
                    ? state.bookmarks.filter((id) => id !== action.payload) // Remove if exists
                    : [...state.bookmarks, action.payload], // Add if not exists
            };
        case BOOKMARK_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default bookmarkReducer;
