const express = require('express');
const multer = require('multer');
const News = require('../models/NewsModels'); // Assuming your model is in 'models/NewsModels.js'
const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/news'); 
  },
  filename(req, file, cb) {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/create', upload.array('images', 5), async (req, res) => {
    const { title, description1, description2, date } = req.body;
    const images = req.files ? req.files.map(file => `/uploads/news/${file.filename}`) : [];

    // Check if at least 1 image is uploaded and not more than 5
    if (images.length < 1) {
      return res.status(400).json({ message: 'At least 1 image is required' });
    }
    
    if (images.length > 5) {
      return res.status(400).json({ message: 'You can upload a maximum of 5 images' });
    }

    if (!title || !date) {
      return res.status(400).json({ message: 'Title and date are required' });
    }

    try {
      const newNews = new News({
        title,
        description1,
        description2,
        date,
        images, // Store the array of image URLs
      });
      await newNews.save();
      res.status(201).json({ message: 'News created successfully', news: newNews });
    } catch (error) {
      res.status(500).json({ message: 'Error creating news', error: error.message });
    }
});

module.exports = router;
