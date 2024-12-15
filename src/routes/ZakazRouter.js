const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Zakaz = require('../models/ZakazModels');

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/zakaz'); // Set a single destination for all file types
    },
    filename(req, file, cb) {
        const timestamp = Date.now();
        cb(null, `${timestamp}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Create a new Zakaz entry
router.post('/create', upload.single('images'), async (req, res) => {
  const { name, description } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    if (!name || !description || !image) {
      return res.status(400).json({ message: "Fields 'name', 'description', and one image are required" });
    }

    const newZakaz = new Zakaz({ name, description, images: [image] });
    await newZakaz.save();
    res.status(201).json({ message: 'Zakaz created successfully', zakaz: newZakaz });
  } catch (error) {
    console.error('Error creating zakaz:', error);
    res.status(500).json({ message: 'Error creating zakaz', error: error.message });
  }
});

// Get all Zakaz entries
router.get('/', async (req, res) => {
    try {
        const zakazList = await Zakaz.find();
        if (!zakazList.length) return res.status(404).json({ message: 'No Zakaz found' });
        res.status(200).json(zakazList);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching zakaz', error: error.message });
    }
});

// Update a Zakaz entry by ID
router.put('/:id', upload.fields([{ name: 'images', maxCount: 5 }]), async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const images = req.files['images'] ? req.files['images'].map(file => file.path) : [];

    try {
        const updatedZakaz = await Zakaz.findByIdAndUpdate(
            id,
            { 
                name,
                description,
                images: images.length ? images : undefined, // Update images only if they exist
            },
            { new: true, omitUndefined: true }
        );
        if (!updatedZakaz) return res.status(404).json({ message: 'Zakaz not found' });
        res.status(200).json({ message: 'Zakaz updated successfully', zakaz: updatedZakaz });
    } catch (error) {
        res.status(500).json({ message: 'Error updating zakaz', error: error.message });
    }
});

// Delete a Zakaz entry by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedZakaz = await Zakaz.findByIdAndDelete(id);
        if (!deletedZakaz) return res.status(404).json({ message: 'Zakaz not found' });
        res.status(200).json({ message: 'Zakaz deleted successfully', zakaz: deletedZakaz });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting zakaz', error: error.message });
    }
});

module.exports = router;
