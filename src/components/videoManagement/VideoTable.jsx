// import React, { useState } from "react";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import { ConfirmDialog } from "../../ui/ConfirmDialog.jsx";
// import EditIcon from "@mui/icons-material/Edit"; // Edit icon
// import InfoIcon from "@mui/icons-material/Info"; // Details icon
// import DeleteIcon from "@mui/icons-material/Delete"; // Delete icon

// export const VideoTable = ({ videos }) => {
//   const [open, setOpen] = useState(false);
//   const [currentVideo, setCurrentVideo] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [videoToDelete, setVideoToDelete] = useState(null);
//   const [isEditFormOpen, setIsEditFormOpen] = useState(false);
//   const [calculatedStatus, setCalculatedStatus] = useState("active");
//   const videoRef = useRef(null);
//   const { deleteVideo } = useVideoStore();

//   const handleOpen = (videoUrl) => {
//     setCurrentVideo(videoUrl);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setCurrentVideo(null);
//     setOpen(false);
//   };

//   const openDeleteDialog = (videoId) => {
//     setVideoToDelete(videoId);
//     setIsDialogOpen(true);
//   };

//   const handleDelete = async () => {
//     if (!videoToDelete) return;
//     setIsLoading(true); // Start loading
//     try {
//       console.log("Video to delete", videoToDelete);
//     } catch (error) {
//       console.error("Error deleting video:", error);
//     } finally {
//       setIsLoading(false); // Stop loading
//       setIsDialogOpen(false); // Close dialog after action
//       setVideoToDelete(null); // Reset video ID
//     }
//   };

//   return (
//     <div className="overflow-x-auto shadow-md rounded-lg">
//       <table className="table-auto border-collapse border border-gray-200 w-full bg-white">
//         <thead className="bg-gray-100 text-gray-700">
//           <tr>
//             <th className="border px-4 py-2">Video</th>
//             <th className="border px-4 py-2">Title</th>
//             <th className="border px-4 py-2">Brand</th>
//             <th className="border px-4 py-2">Expiry Date</th>
//             <th className="border px-4 py-2">Status</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {videos.map((video, index) => (
//             <tr key={index} className="bg-white border-b border-gray-300">
//               <td className="px-4 py-3">
//                 <video
//                   onClick={() => handleOpen(video.fileUrl)}
//                   src={video.fileUrl}
//                   className="w-20 h-12 object-cover cursor-pointer rounded-md hover:scale-105 transition-transform"
//                 />
//               </td>
//               <td className="border px-4 py-2 text-gray-800">{video.filename}</td>
//               <td className="border px-4 py-2 text-gray-800">{video.brand}</td>
//               <td className="border px-4 py-2 text-gray-800">{video.expiredDate}</td>
//               <td className="border px-4 py-3">
//                 <span
//                   className={`text-sm font-semibold ${
//                     video.status === "active" ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {video.status}
//                 </span>
//               </td>
//               <td className="px-4 py-3 flex gap-2">
//                 {/* View Details Button */}
//                 {/* <button
//                   className="text-blue-500 hover:text-blue-700 transition-colors"
//                   title="View Details"
//                 >
//                   <InfoIcon />
//                 </button> */}
//                 {/* Edit Button */}
//                 <button
//                   className="text-yellow-500 hover:text-yellow-700 transition-colors"
//                   title="Edit"
//                   onClick={() => openEditModal(video)} // Open edit modal
//                 >
//                   <EditIcon />
//                 </button>
//                 {/* Delete Button */}
//                 <button
//                   className="text-red-500 hover:text-red-700 transition-colors"
//                   title="Delete"
//                   onClick={() => openDeleteDialog(video._id)}
//                 >
//                   <DeleteIcon />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* ConfirmDialog for Deletion */}
//       <ConfirmDialog
//         open={isDialogOpen}
//         onClose={() => setIsDialogOpen(false)} // Close dialog
//         onConfirm={handleDelete} // Confirm deletion
//         loading={isLoading} // Pass loading state to dialog
//         message="Are you sure you want to delete this video?"
//       />

//       {/* Modal for Video Playback */}
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-video-title"
//         aria-describedby="modal-video-description"
//       >
//         <Box
//           className="flex justify-center items-center"
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             backgroundColor: "black",
//             boxShadow: 24,
//             padding: 10,
//             borderRadius: 8,
//             width: "90vw",
//             height: "auto",
//           }}
//         >
//           {currentVideo && (
//             <video
//               src={currentVideo}
//               controls
//               autoPlay
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 borderRadius: "8px",
//                 boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
//               }}
//             />
//           )}
//         </Box>
//       </Modal>

//       {/* Edit Modal */}
//       <Modal
//         open={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)} // Close the edit modal
//         aria-labelledby="modal-edit-title"
//         aria-describedby="modal-edit-description"
//       >
//         <Box
//           className="flex justify-center items-center"
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             backgroundColor: "white",
//             boxShadow: 24,
//             padding: 16,
//             borderRadius: 8,
//             maxWidth: "80vw",
//             maxHeight: "70vh",
//           }}
//         >
//           {/* Edit form (you can customize as needed) */}
//           <div>
//             <h2 className="font-semibold text-lg mb-4">Edit Video</h2>
//             <form onSubmit={handleEditSave}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium">Title</label>
//                 <input
//                   type="text"
//                   value={videoToEdit?.filename || ""}
//                   onChange={(e) => setVideoToEdit({ ...videoToEdit, filename: e.target.value })}
//                   className="mt-1 p-2 border rounded-md w-full"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium">Expiry Date</label>
//                 <input
//                   type="date"
//                   value={videoToEdit?.expiredDate || ""}
//                   onChange={(e) => setVideoToEdit({ ...videoToEdit, expiredDate: e.target.value })}
//                   className="mt-1 p-2 border rounded-md w-full"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
//               >
//                 Save
//               </button>
//             </form>
//           </div>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ConfirmDialog } from "../../ui/ConfirmDialog.jsx";
import EditIcon from "@mui/icons-material/Edit"; // Edit icon
import DeleteIcon from "@mui/icons-material/Delete"; // Delete icon
import InfoIcon from "@mui/icons-material/Info"; // Optional info icon
import useVideoStore from "../../store/videoStore.js";
import VideoEditForm from "./VideoEdit.jsx";
import useBrandStore from "../../store/brandStore.js";

export const VideoTable = ({ videos }) => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [videoToEdit, setVideoToEdit] = useState(null);
  const [brandNames, setBrandNames] = useState({});
  const { getBrandName } = useBrandStore();
  const { deleteVideo } = useVideoStore();

  useEffect(() => {
    const fetchBrandNames = async () => {
      const names = {};
      for (const video of videos) {
        if (video.brand && !brandNames[video.brand]) {
          try {
            const name = await getBrandName(video.brand);
            names[video.brand] = name;
          } catch (error) {
            console.error(
              `Error fetching brand name for ${video.brand}:`,
              error
            );
          }
        }
      }
      setBrandNames((prev) => ({ ...prev, ...names }));
    };

    fetchBrandNames();
  }, [videos, getBrandName]);

  // Handle Video Playback Modal
  const handleOpenVideoModal = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setOpenVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    setCurrentVideo(null);
    setOpenVideoModal(false);
  };

  // Handle Delete Confirmation Dialog
  const openDeleteDialog = (videoId) => {
    setVideoToDelete(videoId);
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!videoToDelete) return;
    setIsLoading(true);
    try {
      await deleteVideo(videoToDelete);
      console.log("Video deleted successfully:", videoToDelete);
    } catch (error) {
      console.error("Error deleting video:", error);
    } finally {
      setIsLoading(false);
      setIsDialogOpen(false);
      setVideoToDelete(null);
    }
  };

  // Handle Edit Button Click
  const handleEdit = (video) => {
    setVideoToEdit(video);
    setIsEditFormOpen(true);
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="table-auto border-collapse border border-gray-200 w-full bg-white">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border px-4 py-2">Video</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Brand</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Expiry Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video, index) => {
            const isExpired =
              video.expiryDate && new Date(video.expiryDate) < new Date();
            const status = isExpired ? "expired" : "active";

            return (
              <tr key={index} className="bg-white border-b border-gray-300">
                <td className="px-4 py-3">
                  <video
                    onClick={() => handleOpenVideoModal(video.fileUrl)}
                    src={video.fileUrl}
                    className="w-20 h-12 object-cover cursor-pointer rounded-md hover:scale-105 transition-transform"
                  />
                </td>
                <td className="border px-4 py-2 text-gray-800">
                  {video.filename}
                </td>
                <td className="border px-4 py-2 text-gray-800">
                  {brandNames[video.brand] || "Not Available"}
                </td>
                <td className="border px-4 py-2 text-gray-800">
                  {video.description}
                </td>
                <td className="border px-4 py-2 text-gray-800">
                  {new Date(video.expiryDate).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="border px-4 py-3">
                  <span
                    className={`text-sm font-semibold ${
                      status === "active" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {status}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    className="text-yellow-500 hover:text-yellow-700 transition-colors"
                    title="Edit"
                    onClick={() => handleEdit(video)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Delete"
                    onClick={() => openDeleteDialog(video._id)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* ConfirmDialog for Deletion */}
      <ConfirmDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
        loading={isLoading}
        message="Are you sure you want to delete this video?"
      />

      {/* Modal for Video Playback */}
      <Modal
        open={openVideoModal}
        onClose={handleCloseVideoModal}
        aria-labelledby="modal-video-title"
        aria-describedby="modal-video-description"
      >
        <Box
          className="flex justify-center items-center"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "black",
            boxShadow: 24,
            padding: 10,
            borderRadius: 8,
            width: "90vw",
            height: "auto",
          }}
        >
          {currentVideo && (
            <video
              src={currentVideo}
              controls
              autoPlay
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "8px",
                boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
              }}
            />
          )}
        </Box>
      </Modal>

      {/* Modal for Editing */}
      {isEditFormOpen && videoToEdit && (
        <Modal
          open={isEditFormOpen}
          onClose={() => setIsEditFormOpen(false)}
          aria-labelledby="modal-edit-title"
          aria-describedby="modal-edit-description"
        >
          <Box className="modal-content">
            <VideoEditForm
              video={videoToEdit}
              onClose={() => setIsEditFormOpen(false)}
            />
          </Box>
        </Modal>
      )}
    </div>
  );
};
