import React from 'react';
import { Link } from 'react-router-dom';
import pro1 from '../assets/pro1.jpg';
import log1 from '../assets/log1.png';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 px-6 py-4 flex justify-between items-center text-white">
      {/* Left: Logo, App Name, and Menu */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <img
            src={log1}
            alt="App Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-semibold">M2M</span>
        </div>

        {/* Menu Options */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-gray-300 transition duration-200">Home</Link>
          <Link to="/notes" className="hover:text-gray-300 transition duration-200">Notes</Link>
          <Link to="/about" className="hover:text-gray-300 transition duration-200">About</Link>
        </div>
      </div>

      {/* Right: User Name and Profile Image */}
      <div className="flex items-center gap-3">
        <span className="font-medium">Saurabh</span>
        <img
          src={pro1}
          alt="Profile"
          className="h-10 w-10 rounded-full object-cover border-2 border-white"
        />
      </div>
    </nav>
  );
};

export default Navbar;
