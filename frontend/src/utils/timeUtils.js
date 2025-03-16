export const calculateTimeRemaining = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (now < start) {
        // Contest hasn't started yet
        return formatTimeDifference(start - now);
    } else if (now >= start && now <= end) {
        // Contest is ongoing
        return "Ongoing";
    } else {
        // Contest has ended
        return "Ended";
    }
};

// Helper function to format the time difference
const formatTimeDifference = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
};
