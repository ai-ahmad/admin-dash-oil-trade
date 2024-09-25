const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Banner = require('../models/BannerModels'); // Assuming your model is in 'models/Banner.js'
const router = express.Router();

// Ensure the 'uploads/banner' directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'banner');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/banner'); 
  },
  filename(req, file, cb) {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`); // Unique file name
  },
});

// File filter to accept only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only image files are allowed!'), false); // Reject the file
  }
};

// Initialize multer with storage and file filter
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
});

// CREATE a new Banner (Single Image)
router.post('/create', upload.single('image'), async (req, res) => {
  const { description } = req.body;
  const image_url = req.file ? `/uploads/banner/${req.file.filename}` : null;

  if (!image_url || !description) {
    return res.status(400).json({ message: 'Image and description are required' });
  }

  try {
    const newBanner = new Banner({ image_url, description });
    await newBanner.save();
    res.status(201).json({ message: 'Banner created successfully', banner: newBanner });
  } catch (error) {
    console.error('Error creating banner:', error);
    res.status(500).json({ message: 'Error creating banner', error: error.message });
  }
});

// READ all Banners
router.get('/', async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ message: 'Error fetching banners', error: error.message });
  }
});

// READ a single Banner by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.status(200).json(banner);
  } catch (error) {
    console.error('Error fetching banner:', error);
    res.status(500).json({ message: 'Error fetching banner', error: error.message });
  }
});

// UPDATE a Banner by ID (Single Image)
router.put('/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const image_url = req.file ? `/uploads/banner/${req.file.filename}` : undefined;

  try {
    const updatedBanner = await Banner.findByIdAndUpdate(
      id,
      { image_url, description },
      { new: true }
    );

    if (!updatedBanner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    res.status(200).json({ message: 'Banner updated successfully', banner: updatedBanner });
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ message: 'Error updating banner', error: error.message });
  }
});

// DELETE a Banner by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    // Delete the associated image file
    if (banner.image_url) {
      const filePath = path.join(__dirname, '..', banner.image_url);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${filePath}`, err);
        }
      });
    }

    await Banner.findByIdAndDelete(id);
    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.error('Error deleting banner:', error);
    res.status(500).json({ message: 'Error deleting banner', error: error.message });
  }
});

module.exports = router;
