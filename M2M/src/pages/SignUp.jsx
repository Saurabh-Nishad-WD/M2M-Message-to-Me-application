import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // 🔥 Import useNavigate

const SignUpPage = () => {
  const navigate = useNavigate(); // 🔥 Initialize navigate

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        email,
        password,
      });

      setSuccess('User registered successfully!');
      console.log(response.data);

      // 🔥 Redirect to homepage after 1 second delay (optional)
      setTimeout(() => {
        navigate('/'); // 🔥 Navigate to homepage
      }, 1000);

    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-500 to-gray-700">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <Link
              to="/signin"
              className="hover:text-blue-900 hover:underline text-blue-600 font-bold transition duration-200"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
