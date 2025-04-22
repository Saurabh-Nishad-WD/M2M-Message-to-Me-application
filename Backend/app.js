import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoutes.js';
import uploadRoute from './routes/uploadRoutes.js';

dotenv.config();
const app = express();

// 🔒 Allowed origins
const allowedOrigins = [
  "https://m2-m-message-to-me-application-wj8f-a6c0xb2cw.vercel.app",
  "https://m2-m-message-to-me-application-x1ot.vercel.app",
  "https://m2-m-message-to-me-application-wj8f.vercel.app",
  "http://localhost:5173"
];

// 🛡️ Custom CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log("Origin from client:", origin);

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

// 📦 API Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', uploadRoute);

// 🌍 Health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// 🚀 Start server
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
