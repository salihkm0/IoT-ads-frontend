// import React, { useState } from "react";
// import {
//   Avatar,
//   Typography,
//   Card,
//   CardContent,
//   Button,
//   IconButton,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// // import { formatDate } from "../../utils";

// export const ClientCard = ({ client, onDelete }) => {
//   const [clientDetails, setClientDetails] = useState(null);

//   // Open the dialog to show client details
//   const handleInfoOpen = (client) => {
//     setClientDetails(client); // Set the selected client's details
//   };

//   // Close the client details dialog
//   const handleInfoClose = () => {
//     setClientDetails(null);
//   };

//   return (
//     <Card className="w-full sm:w-64 m-2 shadow-lg rounded-lg">
//       <CardContent>
//         {/* Client Header */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <Avatar className="mr-3">{client.rpi_name[0]} </Avatar>
//             <Typography variant="h6" className="ml-2 ">
//               {client.rpi_name}
//             </Typography>
//           </div>
//           <div>
//             {/* Delete Button */}
//             <IconButton onClick={() => onDelete(client.id)} color="secondary">
//               <DeleteIcon />
//             </IconButton>
//           </div>
//         </div>

//         {/* Client Information */}
//         <div className="mt-4">
//           <Typography variant="body2" color="textSecondary">
//             <strong>Owner Name:</strong> {client.owner_name}
//           </Typography>
//           <Typography variant="body2" color="textSecondary" className="mt-1">
//             <strong>Owner Phone:</strong> {client.owner_phone}
//           </Typography>
//           <Typography variant="body2" color="textSecondary" className="mt-1">
//             <strong>Location:</strong> {client.location}
//           </Typography>
//           <Typography variant="body2" color="textSecondary" className="mt-1">
//             <strong>Status:</strong> {client.rpi_status}
//           </Typography>
//           <Typography variant="body2" color="textSecondary" className="mt-1">
//             <strong>Created At:</strong>
//             {new Date(client.createdAt).toLocaleDateString()}
//           </Typography>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-between mt-4">
//           <Button
//             onClick={() => handleInfoOpen(client)}
//             variant="contained"
//             color="primary"
//             size="small"
//           >
//             View Details
//           </Button>
//         </div>
//       </CardContent>
//       {/* Client Details Dialog */}
//       {clientDetails && (
//         <Dialog open={true} onClose={handleInfoClose}>
//           <DialogTitle>Client Details</DialogTitle>
//           <DialogContent>
//             <div>
//               <p>
//                 <strong>RPI Name:</strong> {clientDetails.rpi_name}
//               </p>
//               <p>
//                 <strong>Server URL:</strong> {clientDetails.rpi_serverUrl}
//               </p>
//               <p>
//                 <strong>WiFi SSID:</strong> {clientDetails.wifi_ssid}
//               </p>
//               <p>
//                 <strong>WiFi Password:</strong> {clientDetails.wifi_password}
//               </p>
//               <p>
//                 <strong>Vehicle No:</strong> {clientDetails.vehicle_no}
//               </p>
//               <p>
//                 <strong>Owner Name:</strong> {clientDetails.owner_name}
//               </p>
//               <p>
//                 <strong>Owner Phone:</strong> {clientDetails.owner_phone}
//               </p>
//               <p>
//                 <strong>Location:</strong> {clientDetails.location}
//               </p>
//               <p>
//                 <strong>Status:</strong>
//                 {clientDetails.rpi_status === "active" ? "Active" : "In Active"}
//               </p>
//             </div>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleInfoClose} color="primary">
//               Close
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </Card>
//   );
// };

import React, { useState } from "react";
import {
  Avatar,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // Import Edit icon

export const ClientCard = ({ client, onDelete, onEdit }) => {
  const [clientDetails, setClientDetails] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editableClient, setEditableClient] = useState(client);

  // Open the dialog to show client details
  const handleInfoOpen = (client) => {
    setClientDetails(client); // Set the selected client's details
  };

  // Close the client details dialog
  const handleInfoClose = () => {
    setClientDetails(null);
  };

  // Open the edit dialog
  const handleEditOpen = () => {
    setEditableClient(client); // Set the selected client's details in editable form
    setEditDialogOpen(true); // Open the edit dialog
  };

  // Close the edit dialog
  const handleEditClose = () => {
    setEditDialogOpen(false);
  };

  // Handle client information update
  const handleClientEditSubmit = () => {
    onEdit(editableClient); // Call the onEdit callback to pass the updated client data
    setEditDialogOpen(false); // Close the dialog
  };

  return (
    <Card className="w-full sm:w-auto m-2 shadow-lg rounded-lg">
      <CardContent>
        {/* Client Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="mr-3">{client.rpi_name[0]} </Avatar>
            <Typography variant="h6" className="ml-2 ">
              {client.rpi_name}
            </Typography>
          </div>
          <div className="flex items-center ml-3">
            {/* Edit Button */}
            <IconButton onClick={handleEditOpen} color="primary">
              <EditIcon />
            </IconButton>
            {/* Delete Button */}
            <IconButton onClick={() => onDelete(client.id)} color="secondary">
              <DeleteIcon />
            </IconButton>
          </div>
        </div>

        {/* Client Information */}
        <div className="mt-4">
          <Typography variant="body2" color="textSecondary">
            <strong>Owner Name:</strong> {client.owner_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" className="mt-1">
            <strong>Owner Phone:</strong> {client.owner_phone}
          </Typography>
          <Typography variant="body2" color="textSecondary" className="mt-1">
            <strong>Location:</strong> {client.location}
          </Typography>
          <Typography variant="body2" className="mt-1">
            <strong>Status:</strong>
            <span
              style={{
                color: client.rpi_status === "active" ? "green" : "red",marginLeft : "5px"
              }}
            >
              {client.rpi_status === "active" ? "Active" : "In Active"}
            </span>
          </Typography>

          <Typography variant="body2" color="textSecondary" className="mt-1">
            <strong>Created At:</strong>
            {new Date(client.createdAt).toLocaleDateString()}
          </Typography>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-4">
          <Button
            onClick={() => handleInfoOpen(client)}
            variant="contained"
            color="primary"
            size="small"
          >
            View Details
          </Button>
        </div>
      </CardContent>

      {/* Client Details Dialog */}
      {clientDetails && (
        <Dialog open={true} onClose={handleInfoClose}>
          <DialogTitle>Client Details</DialogTitle>
          <DialogContent>
            <div>
              <p>
                <strong>RPI Name:</strong> {clientDetails.rpi_name}
              </p>
              <p>
                <strong>Server URL:</strong> {clientDetails.rpi_serverUrl}
              </p>
              <p>
                <strong>WiFi SSID:</strong> {clientDetails.wifi_ssid}
              </p>
              <p>
                <strong>WiFi Password:</strong> {clientDetails.wifi_password}
              </p>
              <p>
                <strong>Vehicle No:</strong> {clientDetails.vehicle_no}
              </p>
              <p>
                <strong>Owner Name:</strong> {clientDetails.owner_name}
              </p>
              <p>
                <strong>Owner Phone:</strong> {clientDetails.owner_phone}
              </p>
              <p>
                <strong>Location:</strong> {clientDetails.location}
              </p>
              <p>
                <strong>Status:</strong>
                {clientDetails.rpi_status === "active" ? "Active" : "In Active"}
              </p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleInfoClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Edit Client Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Client</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Owner Name"
            value={editableClient.owner_name}
            onChange={(e) =>
              setEditableClient({
                ...editableClient,
                owner_name: e.target.value,
              })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Owner Phone"
            value={editableClient.owner_phone}
            onChange={(e) =>
              setEditableClient({
                ...editableClient,
                owner_phone: e.target.value,
              })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Location"
            value={editableClient.location}
            onChange={(e) =>
              setEditableClient({ ...editableClient, location: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Status"
            value={editableClient.rpi_status}
            onChange={(e) =>
              setEditableClient({
                ...editableClient,
                rpi_status: e.target.value,
              })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClientEditSubmit} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
