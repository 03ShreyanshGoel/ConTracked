import ContestItem from "./ContestItem";
import { useContext } from "react";
import AuthContext from "../../context/auth/AuthContext";

const ContestTable = ({ contests, isPast }) => {
  const { user } = useContext(AuthContext); // Get user details from context
  const isAdmin = user?.role === "admin"; // Check if the user is an admin

  return (
    <table className="w-full border-collapse rounded-lg shadow-md overflow-hidden">
      <thead>
        <tr className="bg-gray-200 border-b border-gray-300">
          <th className="p-2 text-center">Title</th>
          <th className="p-2 text-center">Time & Date</th>
          {!isPast && <th className="p-2 text-center">Time Left</th>}
          <th className="p-2 text-center">Platform</th>
          {isPast && <th className="p-2 text-center">Bookmark</th>}
          {isPast && <th className="p-2 text-center">Solution</th>}
          {isPast && isAdmin && <th className="p-2 text-center">Upload</th>}
        </tr>
      </thead>
      <tbody>
        {contests.map((contest) => (
          <ContestItem
            key={contest._id}
            contest={contest}
            isPast={isPast}
            isAdmin={isAdmin}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ContestTable;
