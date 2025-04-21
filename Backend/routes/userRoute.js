import express from "express";
import { get } from "mongoose";
import { getUsers } from "../controllers/userControllers.js";
import Story from "../models/textModel.js";
const router = express.Router();

router.get("/", getUsers);

router.post('/upload-text', async (req, res) => {
  try {
    const { textContent,title } = req.body;
    const newStory = new Story({
      title, // or send title from frontend too
      textContent,
      contributorNames: ['Anonymous'], // or send from frontend
    });

    await newStory.save();
    res.status(201).json({ message: 'Story saved!' });
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});
export default router;
