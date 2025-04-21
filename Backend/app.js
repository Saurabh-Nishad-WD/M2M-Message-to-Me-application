import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoutes.js';
import uploadRoute from './routes/uploadRoutes.js';

dotenv.config();
const app = express();

// 🌐 Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json()); // Only once

// 📦 Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', uploadRoute);

// 🌍 Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
