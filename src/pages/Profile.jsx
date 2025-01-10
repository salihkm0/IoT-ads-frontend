import React, { useState } from "react";
import { Avatar, Button, TextField } from "@mui/material";
import { ExitToApp, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export const ProfilePage = () => {
  const { user, logout, editUser } = useAuthStore();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [newDetails, setNewDetails] = useState({
    username: user?.username || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    mobile: user?.mobile || "",
    email: user?.email || "",
    role: user?.role || "",
    image: user?.image || "",
  });
  const [profilePreview, setProfilePreview] = useState(
    user?.image || ""
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePreview(event.target.result);
        setNewDetails({ ...newDetails, image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      Object.keys(newDetails).forEach((key) => {
        formData.append(key, newDetails[key]);
      });

      await editUser(user._id, formData);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleCancelChanges = () => {
    setNewDetails({
      username: user?.username || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      mobile: user?.mobile || "",
      email: user?.email || "",
      role: user?.role || "",
      image: user?.image || "",
    });
    setProfilePreview(user?.image || "");
    setEditMode(false);
  };

  return (
    <div className="flex justify-center items-center p-8 bg-gray-300 w-full rounded-lg">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        {/* Profile Header */}
        <div className="flex items-center mb-4 flex-col gap-5">
          <div className="relative">
            <Avatar
              src={profilePreview || ""}
              alt="Profile Picture"
              sx={{ width: 100, height: 100 }}
            />
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <div
              onClick={() => document.getElementById("fileInput").click()}
              className="absolute bottom-2 right-0 text-white p-1 rounded-full cursor-pointer bg-blue-400"
            >
              <Edit fontSize="small" />
            </div>
          </div>
          <div className="ml-4 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 capitalize">
              {newDetails.firstName} {newDetails.lastName}
            </h2>
            <p className="text-gray-600">{newDetails.email}</p>
            <p className="text-gray-400 mt-1 capitalize">{newDetails.role}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setEditMode(true)}
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

        {/* Edit Form */}
        {editMode && (
          <div className="flex flex-col gap-4">
            <TextField
              label="Username"
              name="username"
              value={newDetails.username}
              onChange={(e) =>
                setNewDetails({ ...newDetails, username: e.target.value })
              }
              fullWidth
              className="mb-4"
            />
            <TextField
              label="First Name"
              name="firstName"
              value={newDetails.firstName}
              onChange={(e) =>
                setNewDetails({ ...newDetails, firstName: e.target.value })
              }
              fullWidth
              className="mb-4"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={newDetails.lastName}
              onChange={(e) =>
                setNewDetails({ ...newDetails, lastName: e.target.value })
              }
              fullWidth
              className="mb-4"
            />
            <TextField
              label="Mobile"
              name="mobile"
              value={newDetails.mobile}
              onChange={(e) =>
                setNewDetails({ ...newDetails, mobile: e.target.value })
              }
              fullWidth
              className="mb-4"
            />
            <TextField
              label="Email"
              name="email"
              value={newDetails.email}
              onChange={(e) =>
                setNewDetails({ ...newDetails, email: e.target.value })
              }
              fullWidth
              className="mb-4"
            />
            <TextField
              label="Role"
              name="role"
              value={newDetails.role}
              onChange={(e) =>
                setNewDetails({ ...newDetails, role: e.target.value })
              }
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
