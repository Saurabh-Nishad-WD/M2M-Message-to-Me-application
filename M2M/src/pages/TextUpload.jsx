import React, { useState } from "react";
import axios from "axios";

export default function TextUploader() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) {
      setStatus("❗ Both fields are required.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/users/upload-text", {
        title,
        textContent: text,
      });
      setStatus("✅ Uploaded to MongoDB!");
      setTitle("");
      setText("");
    } catch (error) {
      console.error("Error uploading:", error);
      setStatus("❌ Failed to upload.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-[#00091a] via-blue-400 to-blue-200 p-6 h-[90vh]">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Write & Upload </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full p-3 mb-4 border border-gray-300 rounded-xl"
            placeholder="Enter a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            rows="6"
            className="w-full p-4 border border-gray-300 rounded-xl"
            placeholder="Write your story here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700"
          >
            Upload
          </button>
        </form>
        {status && <p className="mt-3 text-sm">{status}</p>}
      </div>
    </div>
  );
}
