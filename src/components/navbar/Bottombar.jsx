import React from "react";
import { Link } from "react-router-dom";
import { FaVideo, FaUsers, FaUserCircle } from "react-icons/fa";
import {VideoLibrary} from "@mui/icons-material"; 

export const BottomBar = () => {
  return (
    <div className="fixed bottom-0 w-full bg-gray-800 text-white shadow-lg sm:hidden">
      <div className="flex justify-around items-center py-3">
        {/* Video Management */}
        <Link to="/video-management" className="flex flex-col items-center text-blue-400 hover:text-blue-500">
          <VideoLibrary className="text-2xl" />
          <span className="text-sm">Videos</span>
        </Link>

        {/* Client Management */}
        <Link to="/client-management" className="flex flex-col items-center text-green-400 hover:text-green-500">
          <FaUsers className="text-2xl" />
          <span className="text-sm">Clients</span>
        </Link>

        {/* Profile */}
        <Link to="/profile" className="flex flex-col items-center text-purple-400 hover:text-purple-500">
          <FaUserCircle className="text-2xl" />
          <span className="text-sm">Profile</span>
        </Link>
      </div>
    </div>
  );
};
