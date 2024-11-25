// utils.js
export const formatDate = (date) => {
    if (!date) return ""; // Return empty string if no date is provided
    
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    
    return formattedDate;
  };
  