import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoutes.js';
import uploadRoute from './routes/uploadRoutes.js';

dotenv.config();
const app = express();

app.use((req, res, next) => {
  console.log("Origin from client:", req.headers.origin);
  next();
});


// 🌐 Middleware
app.use(cors({
  origin: 'https://m2-m-message-to-me-application-x1ot.vercel.app', // Correct URL
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
