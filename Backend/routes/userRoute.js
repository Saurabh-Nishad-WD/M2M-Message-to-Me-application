import express from "express";
import { getUsers } from "../controllers/userControllers.js";
import Story from "../models/textModel.js";
import userModel from "../models/userModel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Fetch all users (optional controller usage)
router.get("/", getUsers);

// Fetch all stories of the logged-in user (updated for user-based filtering)
// Assuming the client sends the userId in the request query or body
router.get("/all", protect, async (req, res) => {
  try {
    const userId = req.user.userId; // from JWT
    const stories = await Story.find({ userId });
    res.json(stories);
  } catch (err) {
    console.error("Error fetching stories:", err);
    res.status(500).json({ error: "Something went wrong while fetching stories" });
  }
});


// Upload a new story with userId from the token
router.post("/upload-text", protect, async (req, res) => {
  try {
    const { textContent, title, contributorNames } = req.body;
    const userId = req.user.userId; // req.user is set by the protect middleware
    console.log("req.user");
    console.log(req.user.userId);

    if (!textContent || !title) {
      return res.status(400).json({ message: "All fields are required! (textContent, title)" });
    }
    const newStory = new Story({
      title,
      textContent,
      contributorNames: contributorNames || ["Anonymous"],
      userId,
    });

    await newStory.save();
    res.status(201).json({ message: "Story saved!" });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ error: "Something went wrong while uploading the story" });
  }
});


// Fetch a user by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user info
router.put("/:id", protect, async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userModel.findById(userId);  // Find user by userId
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ username: user.username });  // Return the username
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
