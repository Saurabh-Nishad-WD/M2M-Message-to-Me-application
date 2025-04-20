import React from 'react';
import './Typing.css'; // Typing animation CSS
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-100 ">

      <div className="flex flex-col items-center justify-center h-[90vh] bg-gradient-to-r from-gray-900 via-gray-500 to-gray-700 text-white px-4">
        
        {/* Typing Heading */}
        <h1 className="text-center text-3xl md:text-5xl font-extrabold typing-animation mb-10">
          Welcome to <span className="text-yellow-300">M2M</span>
        </h1>

        {/* Sign-Up Form */}
        <div className="bg-white text-gray-800 rounded-xl p-8 w-full max-w-md shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Create an Account</h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded transition duration-200"
            >
              Sign Up
            </button>
          </form>

          {/* Sign-In Link */}
          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-700 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
