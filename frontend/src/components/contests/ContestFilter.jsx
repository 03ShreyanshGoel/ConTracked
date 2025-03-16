const ContestFilter = ({ selectedPlatforms, setSelectedPlatforms }) => {
  const platforms = ["CodeChef", "Codeforces", "LeetCode"];

  const handleChange = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <div className="flex gap-4 mb-6">
      {platforms.map((platform) => (
        <label key={platform} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-500 focus:ring-0"
            checked={selectedPlatforms.includes(platform)}
            onChange={() => handleChange(platform)}
          />
          <span className="text-lg">{platform}</span>
        </label>
      ))}
    </div>
  );
};
export default ContestFilter;
