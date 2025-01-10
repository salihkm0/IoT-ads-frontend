import React, { useState, useRef, useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import CircularProgress from "@mui/material/CircularProgress";
import VideoEditForm from "../components/videoManagement/VideoEdit.jsx";
import useVideoStore from "../store/videoStore";
import axios from "axios";
import useBrandStore from "../store/brandStore.js";

export const Card = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [calculatedStatus, setCalculatedStatus] = useState("active");
  const [brandName, setBrandName] = useState("");
  const videoRef = useRef(null);
  const { deleteVideo } = useVideoStore();
  const { getBrandName } = useBrandStore();
  const { filename, description, brand, fileUrl, expiryDate, _id } = video;

  // Fetch brand name based on brand ID
  useEffect(() => {
    const fetchBrandName = async () => {
      if (!video.brand) return;
      try {
        const name = await getBrandName(video.brand);
        setBrandName(name);
      } catch (error) {
        console.error("Error fetching brand name:", error);
      }
    };

    fetchBrandName();
  }, [video.brand, getBrandName]);

  // Real-time status update
  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const isExpired = expiryDate && new Date(expiryDate) < now;
      setCalculatedStatus(isExpired ? "expired" : "active");
    };

    // Update status initially
    updateStatus();

    // Check status every second
    const interval = setInterval(updateStatus, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [expiryDate]);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteVideo(_id);
    } catch (error) {
      console.error("Error deleting video:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col gap-2 bg-white shadow-xl border border-slate-400 rounded-lg">
      {/* Video Section */}
      <div className="relative sm:h-40 md:h-44 lg:h-48 overflow-hidden text-white rounded-t-lg">
        <video
          ref={videoRef}
          src={fileUrl} // Use the correct fileUrl for the video source
          className="w-full h-full object-cover"
          loop
        />
        {/* Play/Pause and Mute/Unmute Icons */}
        <div className="absolute bottom-2 right-2 flex space-x-2">
          <button
            onClick={handlePlayPause}
            className="p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition"
          >
            {isPlaying ? (
              <PauseIcon className="text-white" />
            ) : (
              <PlayArrowIcon className="text-white" />
            )}
          </button>
          <button
            onClick={handleMuteToggle}
            className="p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition"
          >
            {isMuted ? (
              <VolumeOffIcon className="text-white" />
            ) : (
              <VolumeUpIcon className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="px-4 ">
        <p className="text-slate-600 text-sm mb-1 font-[600] text-gray-400 ">
          {brandName ? brandName : "Brand Not Available"}
        </p>
        <div className="flex justify-between items-center">
          <h6 className="mb-1 text-slate-800 text-xl font-semibold">
            {filename}
          </h6>
          <p
            className={`text-sm mb-4 ${
              calculatedStatus === "active" ? "text-green-500" : "text-red-500"
            }`}
          >
            {calculatedStatus}
          </p>
        </div>
        <p className="text-slate-600 text-sm mb-1 leading-1">{description}</p>
      </div>

      {/* Card Buttons */}
      <div className="px-4 pb-4 pt-0 flex justify-between items-center">
        <button
          className="rounded-md bg-slate-800 py-2 px-4 text-center text-sm text-white shadow-md hover:bg-slate-700 transition"
          type="button"
          onClick={() => setIsEditFormOpen(true)}
        >
          Edit
        </button>
        <button
          className={`rounded-md py-2 px-4 text-center text-sm text-white shadow-md transition ${
            loading ? "bg-red-500" : "bg-red-600 hover:bg-red-700"
          }`}
          type="button"
          disabled={loading}
          onClick={handleDelete}
        >
          {loading ? (
            <CircularProgress size={20} className="text-white" />
          ) : (
            "Delete"
          )}
        </button>
      </div>
      {/* Edit Form Modal */}
      {isEditFormOpen && (
        <VideoEditForm video={video} onClose={() => setIsEditFormOpen(false)} />
      )}
    </div>
  );
};
