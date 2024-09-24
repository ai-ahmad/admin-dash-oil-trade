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

// Post route to create news
router.post('/', upload.single('image'), async (req, res) => {
    const { title, description1, description2, date } = req.body;
    const image_url = req.file ? `/uploads/news/${req.file.filename}` : null;
  
    if (!image_url || !title || !date) {
      return res.status(400).json({ message: 'Title, date, and image are required' });
    }
  
    try {
      const newNews = new News({
        title,
        description1,
        description2,
        date,
        images: [image_url],
      });
      await newNews.save();
      res.status(201).json({ message: 'News created successfully', news: newNews });
    } catch (error) {
      res.status(500).json({ message: 'Error creating news', error: error.message });
    }
});

module.exports = router;
