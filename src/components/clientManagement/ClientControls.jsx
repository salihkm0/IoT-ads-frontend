import React from "react";
import SortIcon from "@mui/icons-material/Sort";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

export const ClientControls = ({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
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
    <div className="flex items-center justify-between gap-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search clients..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-sm border border-gray-300 rounded-lg px-4 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
      />

      {/* Sort Button and Menu */}
      <div className="relative">
        <button
          className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          onClick={handleSortClick}
        >
          <SortIcon fontSize="small" />
          {/* Hide "Sort" text on small screens */}
          <span className="hidden sm:block">Sort</span>
        </button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleSortClose("")}
          PaperProps={{
            className: "shadow-lg border border-gray-200 rounded-lg",
          }}
        >
          <MenuItem
            onClick={() => handleSortClose("newest")}
            className="text-sm text-gray-700 hover:bg-gray-100"
          >
            Newest
          </MenuItem>
          <MenuItem
            onClick={() => handleSortClose("oldest")}
            className="text-sm text-gray-700 hover:bg-gray-100"
          >
            Oldest
          </MenuItem>
          <MenuItem
            onClick={() => handleSortClose("active")}
            className="text-sm text-gray-700 hover:bg-gray-100"
          >
            Active
          </MenuItem>
          <MenuItem
            onClick={() => handleSortClose("expired")}
            className="text-sm text-gray-700 hover:bg-gray-100"
          >
            Expired
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};
