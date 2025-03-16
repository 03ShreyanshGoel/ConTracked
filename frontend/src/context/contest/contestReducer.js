import { FETCH_CONTESTS, TOGGLE_BOOKMARK, UPLOAD_SOLUTION } from "../types";

export default (state, action) => {
    switch (action.type) {
        case FETCH_CONTESTS:
            return { ...state, contests: action.payload };
        case TOGGLE_BOOKMARK:
            return {
                ...state,
                bookmarks: state.bookmarks.includes(action.payload)
                    ? state.bookmarks.filter(id => id !== action.payload) // Remove if exists
                    : [...state.bookmarks, action.payload], // Add if not
            };
        case UPLOAD_SOLUTION:
            return {
                ...state,
                contests: state.contests.map(contest =>
                    contest.id === action.payload.id ? action.payload : contest
                ),
            };
        default:
            return state;
    }
};
