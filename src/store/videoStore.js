// // src/store/videoStore.js

// import {create} from 'zustand';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// const baseURL = 'https://iot-ads-display.onrender.com/api';

// const useVideoStore = create((set) => ({
//   videos: [],
//   isUploading: false,
//   uploadProgress: 0,

//   // Action to upload a video
//   uploadVideo: async (file, filename, description, expiryDate, brand) => {
//     try {
//       set({ isUploading: true });

//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('filename', filename);
//       formData.append('description', description);
//       formData.append('expiryDate', expiryDate);
//       formData.append('brand', brand);

//       const response = await axios.post(`${baseURL}/upload`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           set({ uploadProgress: percent });
//         },
//       });

//       if (response.status === 201) {
//         toast.success('Video uploaded successfully');
//         set({ uploadProgress: 0 });
//         fetchVideos(); // Refresh the videos list
//       }
//     } catch (error) {
//       console.error('Error uploading video:', error);
//       toast.error('Failed to upload video');
//       set({ uploadProgress: 0 });
//     } finally {
//       set({ isUploading: false });
//     }
//   },

//   fetchVideos: async () => {
//     try {
//       const response = await axios.get(`${baseURL}/videos`);
//       set({ videos: response.data });
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//       toast.error('Failed to fetch videos');
//     }
//   },

//   fetchVideoByFilename: async (filename) => {
//     try {
//       const response = await axios.get(`${baseURL}/video/${filename}`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching video by filename:', error);
//       toast.error('Failed to fetch video');
//     }
//   },

//   // Action to delete a video
//   deleteVideo: async (id) => {
//     try {
//       const response = await axios.delete(`${baseURL}/delete-video/${id}`);
//       if (response.status === 200) {
//         toast.success('Video deleted successfully');
//         fetchVideos(); // Refresh the videos list
//       }
//     } catch (error) {
//       console.error('Error deleting video:', error);
//       toast.error('Failed to delete video');
//     }
//   },

//   // Action to update a video
//   updateVideo: async (id, filename, description, expiryDate, brand) => {
//     try {
//       const response = await axios.put(`${baseURL}/update-video/${id}`, {
//         filename,
//         description,
//         expiryDate,
//         brand,
//       });

//       if (response.status === 200) {
//         toast.success('Video updated successfully');
//         fetchVideos();
//       }
//     } catch (error) {
//       console.error('Error updating video:', error);
//       toast.error('Failed to update video');
//     }
//   },
// }));

// export default useVideoStore;

import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

const baseURL = "https://iot-ads-display.onrender.com/api";

// Create reusable axios instance
const axiosInstance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      config.headers.Authorization = token ? `Bearer ${token}` : "";
      return config;
    },
    (error) => Promise.reject(error)
  );

const useVideoStore = create((set) => {
  // Fetch videos
  const fetchVideos = async () => {
    try {
      const response = await axiosInstance.get("/videos");
      set({ videos: response.data.videos });
    } catch (error) {
      console.error("Error fetching videos:", error);
      toast.error("Failed to fetch videos");
    }
  };

  const getSortedVideos = (videos, sortOption) => {
    if (sortOption === "newest") {
      return videos.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    if (sortOption === "oldest") {
      return videos.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }
    if (sortOption === "active") {
      const currentDate = new Date();
      return videos.filter(
        (video) => new Date(video.expiredDate) > currentDate
      );
    }
    if (sortOption === "expired") {
      const currentDate = new Date();
      return videos.filter(
        (video) => new Date(video.expiredDate) <= currentDate
      );
    }
    return videos;
  };

  // Fetch video by filename
  const fetchVideoByFilename = async (filename) => {
    try {
      const response = await axiosInstance.get(`/video/${filename}`);
      return response.data.videos;
    } catch (error) {
      console.error("Error fetching video by filename:", error);
      toast.error("Failed to fetch video");
    }
  };

  // Delete video
  const deleteVideo = async (id) => {
    try {
      const response = await axiosInstance.delete(`/delete-video/${id}`);
      if (response.data.success) {
        toast.success("Video deleted successfully");
        fetchVideos();
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error("Failed to delete video");
    }
  };

  // Upload video
  const uploadVideo = async (formData) => {
    try {
      set({ isUploading: true });

      const response = await axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("response : ", response);

      if (response.data.success) {
        toast.success("Video uploaded successfully");
        fetchVideos();
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Failed to upload video");
    } finally {
      set({ isUploading: false, uploadProgress: 0 });
    }
  };

  // Update video
  const updateVideo = async (id, filename, description, expiryDate, brand) => {
    try {
      const response = await axiosInstance.put(`/update-video/${id}`, {
        filename,
        description,
        expiryDate,
        brand,
      });

      if (response.data.success) {
        toast.success("Video updated successfully");
        fetchVideos();
      }
    } catch (error) {
      console.error("Error updating video:", error);
      toast.error("Failed to update video");
    }
  };

  return {
    videos: [],
    isUploading: false,
    uploadProgress: 0,
    fetchVideos,
    fetchVideoByFilename,
    deleteVideo,
    uploadVideo,
    updateVideo,
    getSortedVideos,
  };
});

export default useVideoStore;
