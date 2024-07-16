const BASE_URL = "https://aircall-backend.onrender.com/activities/";

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
};

const extractTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const convertTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} minute${
    minutes !== 1 ? "s" : ""
  } and ${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`;
};

export {
    BASE_URL,
    formatDate,
    extractTime,
    convertTime
  }