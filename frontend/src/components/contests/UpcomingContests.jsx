import { useContext } from "react";
import ContestContext from "../../context/contest/ContestContext";
import ContestTable from "./ContestTable";

const UpcomingContests = ({ selectedPlatforms }) => {
  const { contests } = useContext(ContestContext);

  return (
    <div className=" bg-white rounded-xl shadow-md">
      <ContestTable
        contests={contests.filter(
          (c) =>
            c.status === "UPCOMING" && selectedPlatforms.includes(c.platform)
        )}
      />
    </div>
  );
};

export default UpcomingContests;
