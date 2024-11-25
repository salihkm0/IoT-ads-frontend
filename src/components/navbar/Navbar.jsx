// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// export const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="bg-gray-800 p-4 fixed top-0 w-full z-50">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         {/* Logo */}
//         <div className="text-white font-bold text-xl">
//           <Link to="/">Admin Pannel</Link>
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
//           <Link to="/video-management" className="text-white hover:text-white">
//             Video Management
//           </Link>
//           <Link to="/client-management" className="text-white hover:text-white">
//             Client Management
//           </Link>
//           <Link to="/profile" className="text-white hover:text-white">
//             Profile
//           </Link>
//         </div>
//       </div>

//       {/* Dropdown Menu for Mobile */}
//       <div
//         className={`lg:hidden ${isOpen ? "block" : "hidden"} bg-gray-600 p-4`}
//       >
//         <Link
//           to="/video-management"
//           className="block text-white py-2 px-4 hover:bg-blue-500"
//           onClick={toggleMenu}
//         >
//           Video Management
//         </Link>
//         <Link
//           to="/client-management"
//           className="block text-white py-2 px-4 hover:bg-blue-500"
//           onClick={toggleMenu}
//         >
//           Client Management
//         </Link>
//         <Link
//           to="/profile"
//           className="block text-white py-2 px-4 hover:bg-blue-500"
//           onClick={toggleMenu}
//         >
//           Profile
//         </Link>
//       </div>
//     </nav>
//   );
// };


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, VideoLibrary, Person } from "@mui/icons-material"; 
import { FaUsers } from "react-icons/fa";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 text-white p-4 fixed top-0 w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white font-semibold text-xl flex items-center space-x-2">
          <Home className="text-2xl" />
          <Link to="/" className="font-bold">Admin Panel</Link>
        </div>

        {/* Menu Toggle for Mobile */}
        <div className="hidden sm:block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navbar Links for Larger Screens */}
        <div className="hidden lg:flex space-x-6">
          <Link to="/video-management" className="flex items-center text-white hover:text-blue-400 transition-all">
            <VideoLibrary className="mr-2" />
            Video Management
          </Link>
          <Link to="/client-management" className="flex items-center text-white hover:text-blue-400 transition-all">
            <FaUsers className="mr-2 text-2xl" />
            User Management
          </Link>
          <Link to="/profile" className="flex items-center text-white hover:text-blue-400 transition-all">
            <Person className="mr-2" />
            Profile
          </Link>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      <div
        className={`lg:hidden ${isOpen ? "block" : "hidden"} bg-gray-700 p-4 transition-all duration-300 ease-in-out transform ${isOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <Link
          to="/video-management"
          className="block text-white py-2 px-4 hover:bg-blue-500 transition-colors"
          onClick={toggleMenu}
        >
          <VideoLibrary className="mr-2 inline" />
          Video Management
        </Link>
        <Link
          to="/client-management"
          className="block text-white py-2 px-4 hover:bg-blue-500 transition-colors"
          onClick={toggleMenu}
        >
          <FaUsers className="mr-2 inline text-2xl"/>
          Client Management
        </Link>
        <Link
          to="/profile"
          className="block text-white py-2 px-4 hover:bg-blue-500 transition-colors"
          onClick={toggleMenu}
        >
          <Person className="mr-2 inline" />
          Profile
        </Link>
      </div>
    </nav>
  );
};
