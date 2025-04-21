import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import profilePic from "../assets/pro1.jpg";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });

  const token = localStorage.getItem("token");
  let userId = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id || decoded.userId || decoded._id;
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/users/${userId}`)
        .then((res) => {
          setUser(res.data);
          setFormData({
            name: res.data.name || "",
            email: res.data.email || "",
            bio: res.data.bio || "",
          });
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [userId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        formData
      );
      setUser(res.data);
      setIsEditing(false);
      alert("Profile updated!");
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out!");
    window.location.href = "/signin";
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-white text-2xl">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-10 text-white text-2xl">
        User Not Found <br />
        <Link to="/signin" className="underline text-blue-400">
          Please Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#00091a] via-[#001233] to-[#002466] p-6 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-center mb-4">
          <img
            src={profilePic}
            alt="Profile"
            className="h-32 w-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
          />
        </div>

        <h1 className="text-2xl font-bold text-center mb-4">About Me</h1>

        {!isEditing ? (
          <>
            <div className="space-y-4 playwrite">
              <div>
                <h2 className="text-sm text-gray-500">Name</h2>
                <p className="text-lg font-medium">{user.username}</p>
              </div>
              <div>
                <h2 className="text-sm text-gray-500">Email</h2>
                <p className="text-lg font-medium">{user.email}</p>
              </div>
              <div>
                <h2 className="text-sm text-gray-500">Bio</h2>
                {user.bio ? (
                  <p className="text-lg font-medium">{user.bio}</p>
                ) : (
                  <p className="text-lg text-gray-400 font-medium">
                    Add your bio details in edit section
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setIsEditing(true)}
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
          </>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Email"
            />
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Short Bio"
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
        )}
      </div>
    </div>
  );
};

export default AboutPage;
