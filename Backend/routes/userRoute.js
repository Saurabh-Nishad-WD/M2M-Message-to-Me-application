import express from "express";
import { getUsers } from "../controllers/userControllers.js";
import Story from "../models/textModel.js";
import userModel from "../models/userModel.js";

const router = express.Router();

// Fetch all users (optional controller usage)
router.get("/", getUsers);

// Fetch all stories of the logged-in user (updated for user-based filtering)
// Assuming the client sends the userId in the request query or body
router.get("/all", async (req, res) => {
  try {
    const { userId } = req.query; // Get the userId from the query (you can also send it in the body)
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const stories = await Story.find({ userId }); // Fetch only stories belonging to the userId provided
    res.json(stories);
  } catch (err) {
    console.error("Error fetching stories:", err);
    res.status(500).json({ error: "Something went wrong while fetching stories" });
  }
});

// Upload a new story (updated to include userId)
router.post("/upload-text", async (req, res) => {
  try {
    const { textContent, title, contributorNames, userId } = req.body;
    if (!textContent || !title || !userId) {
      return res.status(400).json({ message: "All fields are required! (textContent, title, userId)" });
    }

    const newStory = new Story({
      title,
      textContent,
      contributorNames: contributorNames || ["Anonymous"],
      userId, // Associate the story with the userId provided in the request body
    });

    await newStory.save();
    res.status(201).json({ message: "Story saved!" });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ error: "Something went wrong while uploading the story" });
  }
});

// Fetch a user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user info
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
