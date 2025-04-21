import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-100">
      <div className="flex flex-col items-center justify-center h-[90vh] bg-gradient-to-r from-[#00091a] via-[#002d80] to-[#1e5bcc] text-white px-4">
        
        {/* Typing Heading */}
        <h1 className="text-center text-3xl md:text-5xl font-extrabold typing-animation mb-10">
          Welcome to <span className="text-yellow-300">M2M</span>
        </h1>

        {/* Navigation Buttons */}
        <div className="bg-white text-gray-800 rounded-xl p-8 w-full max-w-md shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Create an Account</h2>
          <Link
            to="/signup"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded transition duration-200 block text-center mb-4"
          >
            Sign Up
          </Link>

          <Link
            to="/signin"
            className="text-blue-700 font-semibold hover:underline text-center block"
          >
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
