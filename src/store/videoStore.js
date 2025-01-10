import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

const baseURL = "http://localhost:5557/api";
// const baseURL = "https://iot-ads-display.onrender.com/api";

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
        (video) => new Date(video.expiryDate) > currentDate
      );
    }
    if (sortOption === "expired") {
      const currentDate = new Date();
      return videos.filter(
        (video) => new Date(video.expiryDate) <= currentDate
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

const uploadVideo = async (formData, onUploadProgress) => {
    try {
      set({ isUploading: true });
  
      const response = await axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          // Calculate progress percentage
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onUploadProgress(progress);
        },
      });
  
      if (response.data.success) {
        toast.success("Video uploaded successfully");
        fetchVideos();
      }
      else{
        toast.error("Failed to upload video");
        console.log("error uploading video :" , response.data);
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
      const response = await axiosInstance.put(`/edit/${id}`, {
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
    fetchVideos,
    fetchVideoByFilename,
    deleteVideo,
    uploadVideo,
    updateVideo,
    getSortedVideos,
  };
});

export default useVideoStore;
