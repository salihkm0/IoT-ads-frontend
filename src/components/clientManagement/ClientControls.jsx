// import React from "react";
// import SortIcon from "@mui/icons-material/Sort";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";

// export const ClientControls = ({
//   searchQuery,
//   setSearchQuery,
//   sortOption,
//   setSortOption,
// }) => {
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleSortClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleSortClose = (option) => {
//     setSortOption(option);
//     setAnchorEl(null);
//   };

//   return (
//     <div className="flex items-center justify-between gap-4">
//       {/* Search Input */}
//       <input
//         type="text"
//         placeholder="Search clients..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="w-full max-w-sm border border-gray-300 rounded-lg px-4 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
//       />

//       {/* Sort Button and Menu */}
//       <div className="relative">
//         <button
//           className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
//           onClick={handleSortClick}
//         >
//           <SortIcon fontSize="small" />
//           {/* Hide "Sort" text on small screens */}
//           <span className="hidden sm:block">Sort</span>
//         </button>

//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={() => handleSortClose("")}
//           PaperProps={{
//             className: "shadow-lg border border-gray-200 rounded-lg",
//           }}
//         >
//           <MenuItem
//             onClick={() => handleSortClose("newest")}
//             className="text-sm text-gray-700 hover:bg-gray-100"
//           >
//             Newest
//           </MenuItem>
//           <MenuItem
//             onClick={() => handleSortClose("oldest")}
//             className="text-sm text-gray-700 hover:bg-gray-100"
//           >
//             Oldest
//           </MenuItem>
//           <MenuItem
//             onClick={() => handleSortClose("active")}
//             className="text-sm text-gray-700 hover:bg-gray-100"
//           >
//             Active
//           </MenuItem>
//           <MenuItem
//             onClick={() => handleSortClose("in_active")}
//             className="text-sm text-gray-700 hover:bg-gray-100"
//           >
//             In Active
//           </MenuItem>
//         </Menu>
//       </div>
//     </div>
//   );
// };


import React from "react";
import SortIcon from "@mui/icons-material/Sort";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TableChartIcon from "@mui/icons-material/TableChart";

export const ClientControls = ({
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
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search clients..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full sm:w-auto px-4 py-2 rounded-md border border-gray-300 outline-none transition focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
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

        {/* sort */}
        <button
          className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium bg-white text-gray-600 hover:bg-gray-100 transition"
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
            onClick={() => handleSortClose("in_active")}
            className="text-sm text-gray-700 hover:bg-gray-100"
          >
            In Active
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};
