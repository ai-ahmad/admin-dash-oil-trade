const express = require('express');
const multer = require('multer');
const Baner = require('../models/Baner'); // Assuming your model is in 'models/Baner.js'
const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/baner'); // Ensure this folder exists
  },
  filename(req, file, cb) {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`); // Unique file name
  },
});

const upload = multer({ storage });

// CREATE a new Baner
router.post('/', upload.single('image'), async (req, res) => {
  const { description } = req.body;
  const image_url = req.file ? `/uploads/baner/${req.file.filename}` : null;

  if (!image_url || !description) {
    return res.status(400).json({ message: 'Image and description are required' });
  }

  try {
    const newBaner = new Baner({ image_url, description });
    await newBaner.save();
    res.status(201).json({ message: 'Baner created successfully', baner: newBaner });
  } catch (error) {
    res.status(500).json({ message: 'Error creating baner', error: error.message });
  }
});

// READ all Baners
router.get('/', async (req, res) => {
  try {
    const baners = await Baner.find();
    res.status(200).json(baners);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching baners', error: error.message });
  }
});

// READ a single Baner by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const baner = await Baner.findById(id);
    if (!baner) {
      return res.status(404).json({ message: 'Baner not found' });
    }
    res.status(200).json(baner);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching baner', error: error.message });
  }
});

// UPDATE a Baner by ID
router.put('/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const image_url = req.file ? `/uploads/baner/${req.file.filename}` : null;

  try {
    const updatedBaner = await Baner.findByIdAndUpdate(
      id,
      { image_url: image_url || undefined, description },
      { new: true, omitUndefined: true } // only update fields provided
    );

    if (!updatedBaner) {
      return res.status(404).json({ message: 'Baner not found' });
    }

    res.status(200).json({ message: 'Baner updated successfully', baner: updatedBaner });
  } catch (error) {
    res.status(500).json({ message: 'Error updating baner', error: error.message });
  }
});

// DELETE a Baner by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBaner = await Baner.findByIdAndDelete(id);
    if (!deletedBaner) {
      return res.status(404).json({ message: 'Baner not found' });
    }
    res.status(200).json({ message: 'Baner deleted successfully', baner: deletedBaner });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting baner', error: error.message });
  }
});

module.exports = router;
