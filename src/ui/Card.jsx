// import React, { useState, useRef } from "react";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import PauseIcon from "@mui/icons-material/Pause";
// import VolumeOffIcon from "@mui/icons-material/VolumeOff";
// import VolumeUpIcon from "@mui/icons-material/VolumeUp";
// import CircularProgress from "@mui/material/CircularProgress"; // Material-UI Spinner

// export const Card = ({video}) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const videoRef = useRef(null);

//   const { filename, description, fileUrl, status } = video;

//   const handlePlayPause = () => {
//     if (isPlaying) {
//       videoRef.current.pause();
//     } else {
//       videoRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const handleMuteToggle = () => {
//     videoRef.current.muted = !isMuted;
//     setIsMuted(!isMuted);
//   };

//   return (
//     <div className="relative flex flex-col gap-2 bg-white shadow-xl border border-slate-400 rounded-lg">
//       {/* Video Section */}
//       <div className="relative sm:h-40 md:h-44 lg:h-48 overflow-hidden text-white rounded-t-lg">
//         <video
//           ref={videoRef}
//           src=""
//           className="w-full h-full object-cover"
//           loop
//         />
//         {/* Play/Pause and Mute/Unmute Icons */}
//         <div className="absolute bottom-2 right-2 flex space-x-2">
//           <button
//             onClick={handlePlayPause}
//             className="p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition"
//           >
//             {isPlaying ? (
//               <PauseIcon className="text-white" />
//             ) : (
//               <PlayArrowIcon className="text-white" />
//             )}
//           </button>
//           <button
//             onClick={handleMuteToggle}
//             className="p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition"
//           >
//             {isMuted ? (
//               <VolumeOffIcon className="text-white" />
//             ) : (
//               <VolumeUpIcon className="text-white" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Card Content */}
//       <div className="px-4">
//         <h6 className="mb-2 text-slate-800 text-lg font-semibold">KFC Kochi</h6>
//         <p className="text-green-500 text-sm mb-4">{video}</p>
//       </div>

//       {/* Card Buttons */}
//       <div className="px-4 pb-4 pt-0 flex justify-between items-center">
//         <button
//           className="rounded-md bg-slate-800 py-2 px-4 text-center text-sm text-white shadow-md hover:bg-slate-700 transition"
//           type="button"
//         >
//           Details
//         </button>
//         <button
//           className={`rounded-md py-2 px-4 text-center text-sm text-white shadow-md transition ${
//             loading ? "bg-red-500" : "bg-red-600 hover:bg-red-700"
//           }`}
//           type="button"
//           disabled={loading}
//         >
//           {loading ? (
//             <CircularProgress size={20} className="text-white" />
//           ) : (
//             "Delete"
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export const CardGrid = () => {
//   const cards = Array.from({ length: 12 }); // Example array for cards

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//       {cards.map((_, index) => (
//         <Card key={index} />
//       ))}
//     </div>
//   );
// };

import React, { useState, useRef } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import CircularProgress from "@mui/material/CircularProgress"; // Material-UI Spinner
import useVideoStore from "../store/videoStore";

export const Card = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const { deleteVideo } = useVideoStore()
  const { filename, description, fileUrl, status,_id } = video;

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
      <div className="px-4">
        <div className="flex justify-between items-center">
          <h6 className="mb-2 text-slate-800 text-lg font-semibold">
            {filename}
          </h6>
          <p
            className={`text-sm mb-4 ${
              status === "active" ? "text-green-500" : "text-red-500"
            }`}
          >
            {status}
          </p>
        </div>
        <p className="text-slate-600 text-sm mb-4">{description}</p>
      </div>

      {/* Card Buttons */}
      <div className="px-4 pb-4 pt-0 flex justify-between items-center">
        <button
          className="rounded-md bg-slate-800 py-2 px-4 text-center text-sm text-white shadow-md hover:bg-slate-700 transition"
          type="button"
        >
          Details
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
    </div>
  );
};
