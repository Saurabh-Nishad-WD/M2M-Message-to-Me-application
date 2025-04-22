import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_RENDER_LINK}/api/users/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setStories(res.data);
      } catch (err) {
        console.error("Error fetching stories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-r from-[#000000] via-[#040c19] to-[#13213b] h-[90vh]">
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
                {story.contributorNames?.join("") || "Anonymous"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
