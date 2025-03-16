import { useContext, useState } from "react";
import ContestContext from "../../context/contest/ContestContext";
import ContestTable from "./ContestTable";
import SolutionModal from "./SolutionModal";

const PastContests = ({ selectedPlatforms }) => {
  const { contests, uploadSolution } = useContext(ContestContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContest, setSelectedContest] = useState(null);

  const now = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);

  const filteredContests = contests.filter(
    (c) =>
      c.status === "PAST" &&
      new Date(c.endTime) >= oneWeekAgo &&
      new Date(c.endTime) <= now &&
      selectedPlatforms.includes(c.platform)
  );

  const handleUploadClick = (contestId) => {
    setSelectedContest(contestId);
    setIsModalOpen(true);
  };

  const handleSolutionSubmit = (url) => {
    if (selectedContest) {
      uploadSolution(selectedContest, url);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl shadow-md">
      <ContestTable
        contests={filteredContests}
        isPast={true}
        onUploadClick={handleUploadClick}
      />
      <SolutionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSolutionSubmit}
      />
    </div>
  );
};

export default PastContests;
