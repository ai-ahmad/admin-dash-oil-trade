const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Banner = require('../models/BannerModels'); // Assuming your model is in 'models/Banner.js'
const router = express.Router();

// Ensure the 'uploads/Banner' directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'Banner');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/Banner'); // Ensure this folder exists
  },
  filename(req, file, cb) {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`); // Unique file name
  },
});

const upload = multer({ storage });

// CREATE a new Banner
router.post('/', upload.single('image'), async (req, res) => {
  const { description } = req.body;
  const image_url = req.file ? `/uploads/Banner/${req.file.filename}` : null;

  if (!image_url || !description) {
    return res.status(400).json({ message: 'Image and description are required' });
  }

  try {
    const newBanner = new Banner({ image_url, description });
    await newBanner.save();
    res.status(201).json({ message: 'Banner created successfully', Banner: newBanner });
  } catch (error) {
    console.error('Error creating Banner:', error);
    res.status(500).json({ message: 'Error creating Banner', error: error.message });
  }
});

// READ all Banners
router.get('/', async (req, res) => {
  try {
    const Banners = await Banner.find();
    res.status(200).json(Banners);
  } catch (error) {
    console.error('Error fetching Banners:', error);
    res.status(500).json({ message: 'Error fetching Banners', error: error.message });
  }
});

// READ a single Banner by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const Banner = await Banner.findById(id);
    if (!Banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.status(200).json(Banner);
  } catch (error) {
    console.error('Error fetching Banner:', error);
    res.status(500).json({ message: 'Error fetching Banner', error: error.message });
  }
});

// UPDATE a Banner by ID
router.put('/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const image_url = req.file ? `/uploads/Banner/${req.file.filename}` : undefined;

  try {
    const updatedBanner = await Banner.findByIdAndUpdate(
      id,
      { image_url, description },
      { new: true }
    );

    if (!updatedBanner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    res.status(200).json({ message: 'Banner updated successfully', Banner: updatedBanner });
  } catch (error) {
    console.error('Error updating Banner:', error);
    res.status(500).json({ message: 'Error updating Banner', error: error.message });
  }
});

// DELETE a Banner by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const Banner = await Banner.findById(id);
    if (!Banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    // Delete the associated image file
    if (Banner.image_url) {
      const filePath = path.join(__dirname, '..', Banner.image_url);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${filePath}`, err);
        }
      });
    }

    await Banner.findByIdAndDelete(id);
    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.error('Error deleting Banner:', error);
    res.status(500).json({ message: 'Error deleting Banner', error: error.message });
  }
});

module.exports = router;
