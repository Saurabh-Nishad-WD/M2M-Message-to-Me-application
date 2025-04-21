import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Decode user ID from token
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const id = decoded.id || decoded.userId || decoded._id;
        setUserId(id);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  useEffect(() => {
    const fetchStories = async () => {
      if (!userId) return;

      try {
        const res = await axios.get("http://localhost:5000/api/users/all");
        const allStories = res.data;

        // Filter only the user's stories
        const userStories = allStories.filter(story => story.userId === userId);
        setStories(userStories);
      } catch (err) {
        console.error("Error fetching stories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [userId]);

  return (
    <div className="p-6 bg-gradient-to-r from-[#000000] via-[#040c19] to-[#13213b] min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">📚 My Stories</h1>

      {loading ? (
        <p className="text-center text-white animate-pulse">Loading stories...</p>
      ) : stories.length === 0 ? (
        <p className="text-center text-white">No stories uploaded yet.</p>
      ) : (
        <div className="space-y-6">
          {stories.map((story) => (
            <div
              key={story._id}
              className="bg-gradient-to-r from-[#0b1d38] via-[#1e355c] to-[#182130] p-4 rounded-lg shadow-md border border-gray-200"
            >
              <h2 className="text-lg text-blue-400 font-semibold mb-2">{story.title}</h2>
              <p className="text-white whitespace-pre-wrap">{story.textContent}</p>
              <p className="text-xs text-right text-white mt-2">
                {story.contributorNames?.join(", ") || "Anonymous"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
