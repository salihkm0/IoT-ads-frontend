import React from "react";
import Modal from "@mui/material/Modal"; // Material-UI Modal
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export const ConfirmDialog = ({ open, onClose, onConfirm, message, loading }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        className="flex flex-col justify-center items-center p-6 bg-white rounded-lg shadow-lg"
        style={{
          width: "300px",
          margin: "auto",
          marginTop: "20vh",
          outline: "none",
        }}
      >
        <p className="mb-4 text-slate-700">{message}</p>
        <div className="flex space-x-4">
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-md ${
              loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
            } text-white`}
            disabled={loading} // Disable button during loading
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Confirm"
            )}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            disabled={loading} // Optional: Disable cancel button during loading
          >
            Cancel
          </button>
        </div>
      </Box>
    </Modal>
  );
};
