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

// CREATE News (POST)
router.post('/create', upload.array('images', 5), async (req, res) => {
    const { title, description1, description2, date } = req.body;
    const images = req.files ? req.files.map(file => `/uploads/news/${file.filename}`) : [];

    if (images.length < 1 || images.length > 5) {
      return res.status(400).json({ message: 'You must upload between 1 and 5 images' });
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
        images,
      });
      await newNews.save();
      res.status(201).json({ message: 'News created successfully', news: newNews });
    } catch (error) {
      res.status(500).json({ message: 'Error creating news', error: error.message });
    }
});

// READ News (GET all news)
router.get('/', async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news', error: error.message });
  }
});

// READ single News (GET by ID)
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news', error: error.message });
  }
});

// UPDATE News (PUT by ID)
router.put('/:id', upload.array('images', 5), async (req, res) => {
  const { title, description1, description2, date } = req.body;
  const images = req.files ? req.files.map(file => `/uploads/news/${file.filename}`) : [];

  try {
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description1,
        description2,
        date,
        images,
      },
      { new: true }
    );
    if (!updatedNews) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json({ message: 'News updated successfully', news: updatedNews });
  } catch (error) {
    res.status(500).json({ message: 'Error updating news', error: error.message });
  }
});

// DELETE News (DELETE by ID)
router.delete('/:id', async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);
    if (!deletedNews) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting news', error: error.message });
  }
});

module.exports = router;
