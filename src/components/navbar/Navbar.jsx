// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Home, VideoLibrary, Person } from "@mui/icons-material"; 
// import InfoIcon from "@mui/icons-material/Info";
// import { FaUsers } from "react-icons/fa";

// export const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="bg-gray-900 text-white p-4 fixed top-0 w-full z-50 shadow-lg">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         {/* Logo */}
//         <div className="text-white font-semibold text-xl flex items-center space-x-2">
//           <Home className="text-2xl" />
//           <Link to="/" className="font-bold">Admin Panel</Link>
//         </div>

//         {/* Menu Toggle for Mobile */}
//         <div className="hidden sm:block lg:hidden">
//           <button
//             onClick={toggleMenu}
//             className="text-white focus:outline-none"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Navbar Links for Larger Screens */}
//         <div className="hidden lg:flex space-x-6">
//           <Link to="/video-management" className="flex items-center text-white hover:text-blue-400 transition-all">
//             <VideoLibrary className="mr-2" />
//             Video
//           </Link>
//           <Link to="/client-management" className="flex items-center text-white hover:text-blue-400 transition-all">
//             <FaUsers className="mr-2 text-2xl" />
//             User
//           </Link>
//           <Link to="/brand-management" className="flex items-center text-white hover:text-blue-400 transition-all">
//             <InfoIcon className="mr-2 text-2xl" />
//             Brand
//           </Link>
//           <Link to="/profile" className="flex items-center text-white hover:text-blue-400 transition-all">
//             <Person className="mr-2" />
//             Profile
//           </Link>
//         </div>
//       </div>

//       {/* Dropdown Menu for Mobile */}
//       <div
//         className={`lg:hidden ${isOpen ? "block" : "hidden"} bg-gray-700 p-4 transition-all duration-300 ease-in-out transform ${isOpen ? "translate-y-0" : "-translate-y-full"}`}
//       >
//         <Link
//           to="/video-management"
//           className="block text-white py-2 px-4 hover:bg-blue-500 transition-colors"
//           onClick={toggleMenu}
//         >
//           <VideoLibrary className="mr-2 inline" />
//           Video Management
//         </Link>
//         <Link
//           to="/client-management"
//           className="block text-white py-2 px-4 hover:bg-blue-500 transition-colors"
//           onClick={toggleMenu}
//         >
//           <FaUsers className="mr-2 inline text-2xl"/>
//           Client Management
//         </Link>
//         <Link
//           to="/profile"
//           className="block text-white py-2 px-4 hover:bg-blue-500 transition-colors"
//           onClick={toggleMenu}
//         >
//           <Person className="mr-2 inline" />
//           Profile
//         </Link>
//       </div>
//     </nav>
//   );
// };


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, VideoLibrary, Person } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import { FaUsers } from "react-icons/fa";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white fixed top-0 w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Home className="text-3xl mr-2" />
            <Link to="/" className="text-2xl font-bold tracking-wide">
              Admin Panel
            </Link>
          </div>

          {/* Links for Larger Screens */}
          <div className="hidden lg:flex space-x-8">
            <Link
              to="/video-management"
              className="flex items-center text-white hover:text-gray-200 transition"
            >
              <VideoLibrary className="mr-2" />
              Video
            </Link>
            <Link
              to="/client-management"
              className="flex items-center text-white hover:text-gray-200 transition"
            >
              <FaUsers className="mr-2" />
              User
            </Link>
            <Link
              to="/brand-management"
              className="flex items-center text-white hover:text-gray-200 transition"
            >
              <InfoIcon className="mr-2" />
              Brand
            </Link>
            <Link
              to="/profile"
              className="flex items-center text-white hover:text-gray-200 transition"
            >
              <Person className="mr-2" />
              Profile
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="focus:outline-none text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden bg-blue-600 ${
          isOpen ? "block" : "hidden"
        } transition-all duration-300`}
      >
        <Link
          to="/video-management"
          className="block text-white py-3 px-4 hover:bg-blue-700"
          onClick={toggleMenu}
        >
          <VideoLibrary className="mr-2 inline" />
          Video Management
        </Link>
        <Link
          to="/client-management"
          className="block text-white py-3 px-4 hover:bg-blue-700"
          onClick={toggleMenu}
        >
          <FaUsers className="mr-2 inline" />
          Client Management
        </Link>
        <Link
          to="/brand-management"
          className="block text-white py-3 px-4 hover:bg-blue-700"
          onClick={toggleMenu}
        >
          <InfoIcon className="mr-2 inline" />
          Brand Management
        </Link>
        <Link
          to="/profile"
          className="block text-white py-3 px-4 hover:bg-blue-700"
          onClick={toggleMenu}
        >
          <Person className="mr-2 inline" />
          Profile
        </Link>
      </div>
    </nav>
  );
};
