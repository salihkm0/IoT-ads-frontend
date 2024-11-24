import React from "react";
import SortIcon from "@mui/icons-material/Sort";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TableChartIcon from "@mui/icons-material/TableChart";

export const VideoControls = ({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  setView,
  view,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = (option) => {
    setSortOption(option);
    setAnchorEl(null);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3 sm:gap-6 p-4 rounded-lg bg-gray-50 shadow-sm border border-gray-300">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full sm:w-auto px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
      />
      <div className="flex justify-between items-center gap-2 sm:gap-4">
        {/* Card View Button */}
        <button
          onClick={() => setView("card")}
          className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition ${
            view === "card"
              ? "bg-blue-100 border-blue-500 text-blue-600 shadow-sm"
              : "bg-white border-gray-300 text-gray-600"
          }`}
        >
          <ViewModuleIcon fontSize="small" />
          <span className="hidden sm:block">Card View</span>
        </button>

        {/* Table View Button */}
        <button
          onClick={() => setView("table")}
          className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition ${
            view === "table"
              ? "bg-blue-100 border-blue-500 text-blue-600 shadow-sm"
              : "bg-white border-gray-300 text-gray-600"
          }`}
        >
          <TableChartIcon fontSize="small" />
          <span className="hidden sm:block">Table View</span>
        </button>

        <button
          className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium bg-white text-gray-600 hover:bg-gray-100 transition"
          onClick={handleSortClick}
        >
          <SortIcon fontSize="small" />
          <span className="hidden sm:block">Sort</span>
        </button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleSortClose("")}
        >
          <MenuItem onClick={() => handleSortClose("newest")}>Newest</MenuItem>
          <MenuItem onClick={() => handleSortClose("oldest")}>Oldest</MenuItem>
          <MenuItem onClick={() => handleSortClose("active")}>Active</MenuItem>
          <MenuItem onClick={() => handleSortClose("expired")}>
            Expired
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};
