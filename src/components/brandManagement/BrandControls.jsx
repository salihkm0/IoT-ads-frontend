import React from "react";

export const BrandControls = ({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  setView,
  view,
}) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search Brands"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 rounded-md border border-gray-300"
      />

      {/* Sort */}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="p-2 rounded-md border border-gray-300"
      >
        <option value="">Sort by</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>

      {/* View Toggle */}
      <button
        onClick={() => setView(view === "card" ? "table" : "card")}
        className="p-2 rounded-md bg-gray-200 hover:bg-gray-300"
      >
        {view === "card" ? "Table View" : "Card View"}
      </button>
    </div>
  );
};
