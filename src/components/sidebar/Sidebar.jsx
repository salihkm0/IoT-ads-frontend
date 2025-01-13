import React from 'react';
import { Link } from 'react-router-dom';
import { VideoLibrary, Person } from '@mui/icons-material';
import { FaUsers } from 'react-icons/fa';
import { Info as InfoIcon } from '@mui/icons-material';

export const Sidebar = () => {
  return (
    <div className="w-[220px] hidden md:block pt-[70px] z-40 border h-[100vh] fixed top-0 left-0 bg-gradient-to-b from-indigo-600 to-blue-500 text-white p-4 shadow-md">
      
      <div className="flex flex-col items-center mb-4">
        <div className="w-40 h-40 mt-8 rounded-full overflow-hidden border-2 border-white">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB1Y8TzmsYlZedWfupq4twdHOGFYMdRKZasQ&s" 
            alt="Admin" 
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="mt-4 text-lg font-semibold">Admin Name</h2>
        <p className="text-sm text-gray-300">admin@example.com</p>
      </div>

     
      <hr className="border-white-600 mb-4" />

      
      <ul className="space-y-4">
        <li>
          <Link
            to="/video-management"
            className="flex items-center text-white hover:bg-indigo-600 hover:text-gray-200 p-2 rounded-md transition"
          >
            <VideoLibrary className="mr-2" />
            Video
          </Link>
        </li>
        <li>
          <Link
            to="/client-management"
            className="flex items-center text-white hover:bg-indigo-600 hover:text-gray-200 p-2 rounded-md transition"
          >
            <FaUsers className="mr-2" />
            User
          </Link>
        </li>
        <li>
          <Link
            to="/brand-management"
            className="flex items-center text-white hover:bg-indigo-600 hover:text-gray-200 p-2 rounded-md transition"
          >
            <InfoIcon className="mr-2" />
            Brand
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className="flex items-center text-white hover:bg-indigo-600 hover:text-gray-200 p-2 rounded-md transition"
          >
            <Person className="mr-2" />
            Profile
          </Link>
        </li>
      </ul>

      
      <div className="absolute bottom-4 left-0 w-full px-4">
        <button
          className="w-full flex items-center justify-center text-white bg-red-600 hover:bg-red-700 p-2 rounded-md transition">
          Logout
        </button>
      </div>
    </div>
  );
};
