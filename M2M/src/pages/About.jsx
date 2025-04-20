import React, { useState } from "react";
import profilePic from "../assets/pro1.jpg"; // <-- Replace with your actual path

const AboutPage = () => {
  const [user, setUser] = useState({
    name: "Saurabh Singh",
    email: "saurabh@example.com",
    bio: "Aspiring developer, dreamer, and doer.",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUser(formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#00091a] via-[#001233] to-[#002466] p-6 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={profilePic}
            alt="Profile"
            className="h-32 w-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
          />
        </div>

        <h1 className="text-2xl font-bold text-center mb-4">About Me</h1>

        <div className="space-y-4">
          <div>
            <h2 className="text-sm text-gray-500">Name</h2>
            <p className="text-lg font-medium">{user.name}</p>
          </div>

          <div>
            <h2 className="text-sm text-gray-500">Email</h2>
            <p className="text-lg font-medium">{user.email}</p>
          </div>

          <div>
            <h2 className="text-sm text-gray-500">Bio</h2>
            <p className="text-lg font-medium">{user.bio}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleEditToggle}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Log Out
          </button>
        </div>

        {isEditing && (
          <div className="mt-6">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Short Bio"
                className="w-full border rounded px-3 py-2"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutPage;
