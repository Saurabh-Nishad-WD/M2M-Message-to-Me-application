import express from 'express';
import { login, register } from '../controllers/authControllers.js';
const router = express.Router();

// Sign-up Route
router.get("/sign", (req, res) => {
  res.send("saurabh's route working!");
});

router.post('/signup', register);

// Sign-in Route
router.post('/signin', login);

export default router;
