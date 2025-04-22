import React from "react";
import { Link } from "react-router-dom";
import pro1 from "../assets/pro1.jpg";
import log1 from "../assets/log1.png";

const Navbar = () => {
  // Retrieve the username from localStorage
  const username = localStorage.getItem("username") || "Guest"; // Default to "Guest" if no username is stored

  return (
    <nav className="bg-gray-900 px-6 py-4 flex justify-between items-center text-white border-b-[3px] border-gray-600">
      {/* Left: Logo, App Name, and Menu */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <img
            src={log1}
            alt="App Logo"
            className="h-10 w-10 object-contain mr-0.5"
          />
          <span className="caveat text-white text-[15px] translate-y-3">
            by saurabh
          </span>
          <span className="bg-white ml-3 h-10 w-[3px]"></span>
        </div>

        {/* Menu Options */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-gray-300 transition duration-200">
            Home
          </Link>
          <Link
            to="/notes"
            className="hover:text-gray-300 transition duration-200"
          >
            Notes
          </Link>
          <Link
            to="/about"
            className="hover:text-gray-300 transition duration-200"
          >
            About
          </Link>
        </div>
      </div>

      {/* Right: User Name and Profile Image */}
      <div className="flex items-center gap-1">
        <span className="font-medium roboto">Hi,</span>
        <span className="text-xl dancing">{username}</span> {/* Display dynamic username */}
        <Link to="/about">
          <img
            src={pro1}
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover border-2 border-white cursor-pointer"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
