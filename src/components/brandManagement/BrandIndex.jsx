// import React, { useState, useEffect } from "react";
// import { Heading } from "../../ui/Headding.jsx";
// import { BrandControls } from "./BrandControls.jsx"; 
// import { BrandTable } from "./BrandTable.jsx"; 
// import AddIcon from "@mui/icons-material/Add";
// import useBrandStore from "../../store/brandStore.js";
// import { BrandCard } from "./BrandCard.jsx"; 
// import { BrandAddForm } from "./BrandAddForm.jsx";

// export const BrandManagement = () => {
//   const [isAddFormOpen, setIsAddFormOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortOption, setSortOption] = useState("");
//   const [view, setView] = useState("card"); // Default view is card
//   const { brands, fetchBrands, createBrand, deleteBrand, updateBrand } = useBrandStore();

//   useEffect(() => {
//     fetchBrands();
//   }, [fetchBrands]);

//   // Filter brands based on search query
//   const filteredBrands = brands.filter((brand) =>
//     brand.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Sort brands based on selected option
//   const sortedBrands = () => {
//     switch (sortOption) {
//       case "newest":
//         return [...filteredBrands].sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//       case "oldest":
//         return [...filteredBrands].sort(
//           (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
//         );
//       default:
//         return filteredBrands;
//     }
//   };

//   return (
//     <div className="p-5 bg-gray-50 min-h-screen">
//       {/* Header Section */}
//       <div className="flex justify-between items-center flex-wrap mb-4">
//         <Heading>Brand Management</Heading>

//         {/* Add Brand Button */}
//         <button
//           onClick={() => setIsAddFormOpen(true)}
//           className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-600 px-4 py-2 text-white text-sm font-medium shadow-md hover:from-green-600 hover:to-teal-700 transition-all"
//         >
//           <AddIcon fontSize="small" />
//           <span className="hidden sm:block">Add Brand</span>
//         </button>
//       </div>

//       {/* Brand Controls */}
//       <BrandControls
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         sortOption={sortOption}
//         setSortOption={setSortOption}
//         setView={setView}
//         view={view}
//       />

//       {/* Brand Table or Card View */}
//       <div className="mt-5">
//         {view === "card" ? (
//           <div className="flex flex-wrap justify-center">
//             {sortedBrands().map((brand) => (
//               <BrandCard
//                 key={brand._id}
//                 brand={brand}
//                 onDelete={deleteBrand}
//                 onEdit={updateBrand}
//               />
//             ))}
//           </div>
//         ) : (
//           <BrandTable
//             brands={sortedBrands()}
//             onDelete={deleteBrand}
//             onEdit={updateBrand}
//           />
//         )}
//       </div>

//       {/* Add Brand Form Modal */}
//       {isAddFormOpen && (
//         <BrandAddForm
//           onClose={() => setIsAddFormOpen(false)}
//           createBrand={createBrand}
//         />
//       )}
//     </div>
//   );
// };



import React, { useState, useEffect } from "react";
import { Heading } from "../../ui/Headding.jsx";
import { BrandControls } from "./BrandControls.jsx";
import { BrandTable } from "./BrandTable.jsx";
import AddIcon from "@mui/icons-material/Add";
import useBrandStore from "../../store/brandStore.js";
import { BrandCard } from "./BrandCard.jsx";
import { BrandAddForm } from "./BrandAddForm.jsx";

export const BrandManagement = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null); // Holds brand data for editing
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [view, setView] = useState("card");
  const { brands, fetchBrands, createBrand, deleteBrand, updateBrand } =
    useBrandStore();

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleAddBrand = () => {
    setCurrentBrand(null); // Clear currentBrand for a new brand
    setIsAddFormOpen(true);
  };

  const handleEditBrand = (brand) => {
    setCurrentBrand(brand); // Set the brand to be edited
    setIsAddFormOpen(true);
  };

  const handleSubmitBrand = (brandData) => {
    if (currentBrand) {
      updateBrand(currentBrand._id, brandData); // Update existing brand
    } else {
      createBrand(brandData); // Create new brand
    }
    setIsAddFormOpen(false);
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedBrands = () => {
    switch (sortOption) {
      case "newest":
        return [...filteredBrands].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "oldest":
        return [...filteredBrands].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      default:
        return filteredBrands;
    }
  };

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center flex-wrap mb-4">
        <Heading>Brand Management</Heading>

        {/* Add Brand Button */}
        <button
          onClick={handleAddBrand}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-600 px-4 py-2 text-white text-sm font-medium shadow-md hover:from-green-600 hover:to-teal-700 transition-all"
        >
          <AddIcon fontSize="small" />
          <span className="hidden sm:block">Add Brand</span>
        </button>
      </div>

      {/* Brand Controls */}
      <BrandControls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
        setView={setView}
        view={view}
      />

      {/* Brand Table or Card View */}
      <div className="mt-5">
        {view === "card" ? (
          <div className="flex flex-wrap justify-center">
            {sortedBrands().map((brand) => (
              <BrandCard
                key={brand._id}
                brand={brand}
                onEdit={handleEditBrand}
                onDelete={deleteBrand}
              />
            ))}
          </div>
        ) : (
          <BrandTable
            brands={sortedBrands()}
            onDelete={deleteBrand}
            onEdit={handleEditBrand}
          />
        )}
      </div>

      {/* Add/Edit Brand Form Modal */}
      {isAddFormOpen && (
        <BrandAddForm
          onClose={() => setIsAddFormOpen(false)}
          onSubmit={handleSubmitBrand}
          initialData={currentBrand} // Pass initial data for editing
        />
      )}
    </div>
  );
};
