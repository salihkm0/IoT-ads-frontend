// import React, { useState } from "react";
// import InfoIcon from "@mui/icons-material/Info"; // Details icon
// import EditIcon from "@mui/icons-material/Edit"; // Edit icon
// import DeleteIcon from "@mui/icons-material/Delete"; // Delete icon
// import useClientStore from "../../store/clientStore";
// import axios from "axios";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
// } from "@mui/material"; // Import Dialog components

// export const ClientTable = ({ clients }) => {
//   const { deleteRpi } = useClientStore();
//   const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility
//   const [selectedClientId, setSelectedClientId] = useState(null); // To hold the selected client ID for deletion

//   // Open the dialog
//   const handleDialogOpen = (id) => {
//     setSelectedClientId(id);
//     setOpenDialog(true);
//   };

//   // Close the dialog
//   const handleDialogClose = () => {
//     setOpenDialog(false);
//     setSelectedClientId(null);
//   };

//   // Function to handle delete
//   const handleDelete = async () => {
//     if (selectedClientId) {
//       try {
//         // Update the client store after successful deletion
//         deleteRpi(selectedClientId);
//         alert("RPI deleted successfully.");
//       } catch (error) {
//         console.error("Error deleting RPI:", error);
//         alert("Failed to delete the RPI. Please try again.");
//       }
//       handleDialogClose(); // Close the dialog after deletion
//     }
//   };

//   return (
//     <div className="overflow-x-auto shadow-md rounded-lg">
//       <table className="table-auto border-collapse border border-gray-200 w-full bg-white">
//         <thead className="bg-gray-100 text-gray-700">
//           <tr>
//             <th className="border px-4 py-2">RPI Name</th>
//             <th className="border px-4 py-2">Owner Name</th>
//             <th className="border px-4 py-2">Owner Phone</th>
//             <th className="border px-4 py-2">Location</th>
//             <th className="border px-4 py-2">Status</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {clients.map((client, index) => (
//             <tr
//               key={index}
//               className={`${
//                 index % 2 === 0 ? "bg-gray-50" : "bg-white"
//               } hover:bg-gray-100 transition-colors`}
//             >
//               <td className="border px-4 py-2 text-gray-800">
//                 {client.rpi_name}
//               </td>
//               <td className="border px-4 py-2 text-gray-800">
//                 {client.owner_name}
//               </td>
//               <td className="border px-4 py-2 text-gray-800">
//                 {client.owner_phone}
//               </td>
//               <td className="border px-4 py-2 text-gray-800">
//                 {client.location}
//               </td>
//               <td
//                 className={`border px-4 py-2 text-gray-800 ${
//                   client.rpi_status === "active"
//                     ? "text-green-500"
//                     : "text-red-500"
//                 }`}
//               >
//                 {client.rpi_status === "active" ? "Active" : "In Active"}
//               </td>
//               <td className="px-4 py-2 flex justify-center gap-2 items-center h-full">
//                 {/* Details Button */}
//                 <button
//                   className="text-blue-500 hover:text-blue-700 transition-colors"
//                   title="View Details"
//                 >
//                   <InfoIcon />
//                 </button>
//                 {/* Edit Button */}
//                 <button
//                   className="text-yellow-500 hover:text-yellow-700 transition-colors"
//                   title="Edit"
//                 >
//                   <EditIcon />
//                 </button>
//                 {/* Delete Button */}
//                 <button
//                   className="text-red-500 hover:text-red-700 transition-colors"
//                   title="Delete"
//                   onClick={() => handleDialogOpen(client._id)} // Open dialog on click
//                 >
//                   <DeleteIcon />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={openDialog} onClose={handleDialogClose}>
//         <DialogTitle>Delete RPI</DialogTitle>
//         <DialogContent>
//           <p>Are you sure you want to delete this RPI?</p>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleDelete} color="secondary">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };


import React, { useState } from "react";
import InfoIcon from "@mui/icons-material/Info"; // Details icon
import EditIcon from "@mui/icons-material/Edit"; // Edit icon
import DeleteIcon from "@mui/icons-material/Delete"; // Delete icon
import useClientStore from "../../store/clientStore";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material"; // Import Dialog components

export const ClientTable = ({ clients }) => {
  const { deleteRpi } = useClientStore();
  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility
  const [selectedClientId, setSelectedClientId] = useState(null); // To hold the selected client ID for deletion
  const [clientDetails, setClientDetails] = useState(null); // To hold the details of the selected client

  // Open the dialog for deleting
  const handleDialogOpen = (id) => {
    setSelectedClientId(id);
    setOpenDialog(true);
  };

  // Close the dialog for deleting
  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedClientId(null);
  };

  // Function to handle delete
  const handleDelete = async () => {
    if (selectedClientId) {
      try {
        // Update the client store after successful deletion
        deleteRpi(selectedClientId);
        alert("RPI deleted successfully.");
      } catch (error) {
        console.error("Error deleting RPI:", error);
        alert("Failed to delete the RPI. Please try again.");
      }
      handleDialogClose(); // Close the dialog after deletion
    }
  };

  // Open the dialog to show client details
  const handleInfoOpen = (client) => {
    setClientDetails(client); // Set the selected client's details
  };

  // Close the client details dialog
  const handleInfoClose = () => {
    setClientDetails(null);
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="table-auto border-collapse border border-gray-200 w-full bg-white">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border px-4 py-2">RPI Name</th>
            <th className="border px-4 py-2">Owner Name</th>
            <th className="border px-4 py-2">Owner Phone</th>
            <th className="border px-4 py-2">Location</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition-colors`}
            >
              <td className="border px-4 py-2 text-gray-800">
                {client.rpi_name}
              </td>
              <td className="border px-4 py-2 text-gray-800">
                {client.owner_name}
              </td>
              <td className="border px-4 py-2 text-gray-800">
                {client.owner_phone}
              </td>
              <td className="border px-4 py-2 text-gray-800">
                {client.location}
              </td>
              <td
                className={`border px-4 py-2 text-gray-800 ${
                  client.rpi_status === "active"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {client.rpi_status === "active" ? "Active" : "In Active"}
              </td>
              <td className="px-4 py-2 flex justify-center gap-2 items-center h-full">
                {/* Details Button */}
                <button
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                  title="View Details"
                  onClick={() => handleInfoOpen(client)} // Open client details dialog on click
                >
                  <InfoIcon />
                </button>
                {/* Edit Button */}
                <button
                  className="text-yellow-500 hover:text-yellow-700 transition-colors"
                  title="Edit"
                >
                  <EditIcon />
                </button>
                {/* Delete Button */}
                <button
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Delete"
                  onClick={() => handleDialogOpen(client._id)} // Open delete confirmation dialog
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Delete RPI</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this RPI?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Client Details Dialog */}
      {clientDetails && (
        <Dialog open={true} onClose={handleInfoClose}>
          <DialogTitle>Client Details</DialogTitle>
          <DialogContent>
            <div>
              <p><strong>RPI Name:</strong> {clientDetails.rpi_name}</p>
              <p><strong>Server URL:</strong> {clientDetails.rpi_serverUrl}</p>
              <p><strong>WiFi SSID:</strong> {clientDetails.wifi_ssid}</p>
              <p><strong>WiFi Password:</strong> {clientDetails.wifi_password}</p>
              <p><strong>Vehicle No:</strong> {clientDetails.vehicle_no}</p>
              <p><strong>Owner Name:</strong> {clientDetails.owner_name}</p>
              <p><strong>Owner Phone:</strong> {clientDetails.owner_phone}</p>
              <p><strong>Location:</strong> {clientDetails.location}</p>
              <p><strong>Status:</strong> {clientDetails.rpi_status === "active" ? "Active" : "In Active"}</p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleInfoClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};
