import { useReducer } from "react";
import ContestContext from "./ContestContext";
import contestReducer from "./contestReducer";
import { FETCH_CONTESTS, TOGGLE_BOOKMARK, UPLOAD_SOLUTION } from "../types";
import axios from "../../utils/axiosConfig"; // ✅ Correct Import

const ContestState = ({ children }) => {
  const initialState = { contests: [], bookmarks: [] };
  const [state, dispatch] = useReducer(contestReducer, initialState);

  // Fetch contests from API
  const getContests = async (selectedPlatforms = []) => {
    try {
      let query =
        selectedPlatforms.length > 0
          ? `?platform=${selectedPlatforms.join(",")}`
          : "";
      const res = await fetch(`http://localhost:5000/api/contests${query}`); // Pass filter as query params
      const data = await res.json();
      dispatch({ type: FETCH_CONTESTS, payload: data });
    } catch (error) {
      console.error("Error fetching contests:", error);
    }
  };

  // Toggle bookmark status for a contest
  const toggleBookmark = (id) => {
    dispatch({ type: TOGGLE_BOOKMARK, payload: id });
  };

  // Upload solution URL for a contest
  const uploadSolution = async (contestId, solutionUrl) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/contests/${contestId}/solution`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ solutionUrl }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to upload solution");
      }

      const updatedContest = await res.json();
      dispatch({ type: UPLOAD_SOLUTION, payload: updatedContest });
    } catch (error) {
      console.error("Error uploading solution:", error);
    }
  };

  return (
    <ContestContext.Provider
      value={{ ...state, getContests, toggleBookmark, uploadSolution }}
    >
      {children}
    </ContestContext.Provider>
  );
};

export default ContestState;
