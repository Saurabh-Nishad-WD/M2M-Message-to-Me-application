import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();
console.log(1);
// Set up storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // folder name in Cloudinary
    allowed_formats: ['jpg','jpeg', 'png', 'mp4', 'mov'],
  },
});
console.log(1);

const upload = multer({ storage });
console.log(1);

// Upload image or video
router.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.status(200).json({
    message: 'File uploaded successfully!',
    url: req.file,
  });
});

export default router;
