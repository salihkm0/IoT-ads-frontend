// import React, { useState, useEffect } from "react";
// import { Heading } from "../../ui/Headding.jsx";
// import { ClientControls } from "./ClientControls.jsx";
// import { ClientTable } from "./ClientTable.jsx";
// import { ClientAddForm } from "./AddForm.jsx";
// import AddIcon from "@mui/icons-material/Add";
// import useClientStore from "../../store/clientStore.js";

// export const ClientManagement = () => {
//   const [isAddFormOpen, setIsAddFormOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortOption, setSortOption] = useState("");
//   const [loading, setLoading] = useState(true);
//   const { fetchAllRpis, rpis, createRpi } = useClientStore();
//   const [view, setView] = useState("card");

//   // Fetch clients on component mount
//   useEffect(() => {
//     const fetchClients = async () => {
//       setLoading(true);
//       await fetchAllRpis();
//       setLoading(false);
//     };
//     fetchClients();
//   }, [fetchAllRpis]);

//   // Filter clients based on search query
//   const filteredClients = rpis.filter((client) =>
//     client.rpi_name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Sort clients based on selected option
//   const sortedClients = () => {
//     switch (sortOption) {
//       case "newest":
//         return [...filteredClients].sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//       case "oldest":
//         return [...filteredClients].sort(
//           (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
//         );
//       case "active":
//         return filteredClients.filter(
//           (client) => client.rpi_status === "active"
//         );
//       case "in_active":
//         return filteredClients.filter(
//           (client) => client.rpi_status === "in_active"
//         );

//       default:
//         return filteredClients;
//     }
//   };

//   return (
//     <div className="p-5 bg-gray-50 min-h-screen">
//       {/* Header Section */}
//       <div className="flex justify-between items-center flex-wrap mb-4">
//         <Heading>RPI Client Management</Heading>

//         {/* Add Client Button */}
//         <button
//           onClick={() => setIsAddFormOpen(true)}
//           className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-600 px-4 py-2 text-white text-sm font-medium shadow-md hover:from-green-600 hover:to-teal-700 transition-all"
//         >
//           <AddIcon fontSize="small" />
//           <span className="hidden sm:block">Add Client</span>
//         </button>
//       </div>

//       {/* Client Controls */}
//       <ClientControls
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         sortOption={sortOption}
//         setSortOption={setSortOption}
//       />

//       {/* Client Table or Loading */}
//       <div className="mt-5">
//         {loading ? (
//           <p className="text-gray-500 text-center">Loading...</p>
//         ) : (
//           <ClientTable clients={sortedClients()} />
//         )}
//       </div>

//       {/* Add Client Form Modal */}
//       {isAddFormOpen && (
//         <ClientAddForm
//           onClose={() => setIsAddFormOpen(false)}
//           clients={rpis}
//           createRpi={createRpi}
//         />
//       )}
//     </div>
//   );
// };


import React, { useState, useEffect } from "react";
import { Heading } from "../../ui/Headding.jsx";
import { ClientControls } from "./ClientControls.jsx";
import { ClientTable } from "./ClientTable.jsx";
import AddIcon from "@mui/icons-material/Add";
import useClientStore from "../../store/clientStore.js";
import { ClientCard } from "./ClientCard.jsx";
import { ClientAddForm } from "./AddForm.jsx";

export const ClientManagement = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(false);
  const { rpis, createRpi } = useClientStore();
  const [view, setView] = useState("card"); // default view is card

  // Filter clients based on search query
  const filteredClients = rpis.filter((client) =>
    client.rpi_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort clients based on selected option
  const sortedClients = () => {
    switch (sortOption) {
      case "newest":
        return [...filteredClients].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "oldest":
        return [...filteredClients].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "active":
        return filteredClients.filter(
          (client) => client.rpi_status === "active"
        );
      case "in_active":
        return filteredClients.filter(
          (client) => client.rpi_status === "in_active"
        );
      default:
        return filteredClients;
    }
  };

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center flex-wrap mb-4">
        <Heading>RPI Client Management</Heading>

        {/* Add Client Button */}
        <button
          onClick={() => setIsAddFormOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-600 px-4 py-2 text-white text-sm font-medium shadow-md hover:from-green-600 hover:to-teal-700 transition-all"
        >
          <AddIcon fontSize="small" />
          <span className="hidden sm:block">Add Client</span>
        </button>
      </div>

      {/* Client Controls */}
      <ClientControls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
        setView={setView}
        view={view}
      />

      {/* Client Table or Loading */}
      <div className="mt-5">
        {loading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : (
          <>
            {view === "card" ? (
              <div className="flex flex-wrap justify-center">
                {sortedClients().map((client) => (
                  <ClientCard key={client.id} client={client} />
                ))}
              </div>
            ) : (
              <ClientTable clients={sortedClients()} />
            )}
          </>
        )}
      </div>

      {/* Add Client Form Modal */}
      {isAddFormOpen && (
        <ClientAddForm
          onClose={() => setIsAddFormOpen(false)}
          clients={rpis}
          createRpi={createRpi}
        />
      )}
    </div>
  );
};
