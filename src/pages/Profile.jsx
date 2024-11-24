import React, { useState } from "react";
import { Avatar, Button, TextField } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

export const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "https://i.pravatar.cc/150?img=3",
  });
  const [newDetails, setNewDetails] = useState({ ...userDetails });
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  // Handle the edit button click
  const handleEditClick = () => {
    setEditMode(true);
  };

  // Handle saving the updated details
  const handleSaveChanges = () => {
    setUserDetails({ ...newDetails });
    setEditMode(false);
  };

  // Handle canceling the edit mode
  const handleCancelChanges = () => {
    setNewDetails({ ...userDetails });
    setEditMode(false);
  };

  // Handle logout functionality
  const handleLogout = () => {
    // Clear authentication data (you can implement the actual logout logic here)
    navigate("/login"); // Redirect to login page after logout
  };

  // Handle input change for profile details
  const handleInputChange = (e) => {
    setNewDetails({ ...newDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        {/* Profile Header */}
        <div className="flex items-center mb-4">
          <Avatar
            src={userDetails.profilePicture}
            alt="Profile Picture"
            sx={{ width: 100, height: 100 }}
          />
          <div className="ml-4">
            <h2 className="text-2xl font-semibold text-gray-800">{userDetails.name}</h2>
            <p className="text-gray-600">{userDetails.email}</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditClick}
            disabled={editMode}
          >
            Edit Profile
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            startIcon={<ExitToApp />}
          >
            Logout
          </Button>
        </div>

        {/* Edit Profile Form */}
        {editMode && (
          <div>
            <TextField
              label="Name"
              name="name"
              value={newDetails.name}
              onChange={handleInputChange}
              fullWidth
              className="mb-4"
            />
            <TextField
              label="Email"
              name="email"
              value={newDetails.email}
              onChange={handleInputChange}
              fullWidth
              className="mb-4"
            />
            <div className="flex justify-between">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancelChanges}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
