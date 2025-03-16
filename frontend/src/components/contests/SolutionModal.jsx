import { useState } from "react";

const SolutionModal = ({ isOpen, onClose, onSubmit }) => {
  const [solutionUrl, setSolutionUrl] = useState("");

  const handleSubmit = () => {
    onSubmit(solutionUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Upload Solution</h2>
        <input
          type="text"
          placeholder="Enter solution URL"
          value={solutionUrl}
          onChange={(e) => setSolutionUrl(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};
export default SolutionModal;
