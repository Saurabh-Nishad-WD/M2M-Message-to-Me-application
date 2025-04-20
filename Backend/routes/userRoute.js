import express from "express";
import { get } from "mongoose";
import { getUsers } from "../controllers/userControllers.js";
const router = express.Router();

router.get("/", getUsers);
router.get("/saurabh", (req, res) => {
  res.send("saurabh's route working!");
});

export default router;
