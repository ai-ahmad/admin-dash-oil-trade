const express = require('express');
const multer = require('multer');
const Dastavka = require('../models/DastavkaModels');
const path = require('path');

const router = express.Router();

// Multer configuration for image uploads
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'uploads/dastavkadastavka'); // Directory to save images
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
   }
});

const upload = multer({ storage: storage });

<<<<<<< HEAD

// Create a new Dastavka entry
router.post('/create', upload.array('images', 5), async (req, res) => {
    const { name, description } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    try {
        if (!name || !description || images.length === 0) {
            return res.status(400).json({ message: "Fields 'name', 'description', and at least one image are required" });
        }

        const newDastavka = new Dastavka({ name, description, images });
        await newDastavka.save();
        res.status(201).json({ message: 'Dastavka created successfully', dastavka: newDastavka });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Dastavka', error: error.message });
    }
=======
// @route   POST /api/v1/dastavka
// @desc    Create a new dastavka
// @access  Public
router.post('/', upload.array('images', 5), async (req, res) => {
   try {
      const imagePaths = req.files.map(file => file.path);
      const dastavka = new Dastavka({
         name: req.body.name,
         description: req.body.description,
         images: imagePaths
      });
      const savedDastavka = await dastavka.save();
      res.status(201).json(savedDastavka);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
>>>>>>> 3b49f0b1014006e1d92887432f15c831637fd101
});

// @route   GET /api/v1/dastavka
// @desc    Get all dastavkas
// @access  Public
router.get('/', async (req, res) => {
<<<<<<< HEAD
    try {
        const dastavkaList = await Dastavka.find();
        if (!dastavkaList.length) return res.status(404).json({ message: 'No Dastavka found' });
        res.status(200).json(dastavkaList);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Dastavka', error: error.message });
    }
});

// Update a Dastavka entry by ID
router.put('/:id', upload.array('images', 5), async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    try {
        const updatedDastavka = await Dastavka.findByIdAndUpdate(
            id,
            {
                name,
                description,
                images: images.length ? images : undefined, // Update images only if they exist
            },
            { new: true, omitUndefined: true }
        );
        if (!updatedDastavka) return res.status(404).json({ message: 'Dastavka not found' });
        res.status(200).json({ message: 'Dastavka updated successfully', dastavka: updatedDastavka });
    } catch (error) {
        res.status(500).json({ message: 'Error updating Dastavka', error: error.message });
    }
=======
   try {
      const dastavkas = await Dastavka.find();
      res.status(200).json(dastavkas);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// @route   GET /api/v1/dastavka/:id
// @desc    Get a dastavka by ID
// @access  Public
router.get('/:id', async (req, res) => {
   try {
      const dastavka = await Dastavka.findById(req.params.id);
      if (!dastavka) {
         return res.status(404).json({ message: 'Dastavka not found' });
      }
      res.status(200).json(dastavka);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
>>>>>>> 3b49f0b1014006e1d92887432f15c831637fd101
});

// @route   PUT /api/v1/dastavka/:id
// @desc    Update a dastavka by ID
// @access  Public
router.put('/:id', upload.array('images', 5), async (req, res) => {
   try {
      const imagePaths = req.files.map(file => file.path);
      const updatedDastavka = await Dastavka.findByIdAndUpdate(
         req.params.id,
         {
            name: req.body.name,
            description: req.body.description,
            images: imagePaths.length > 0 ? imagePaths : req.body.images // Keep existing images if none uploaded
         },
         { new: true }
      );
      if (!updatedDastavka) {
         return res.status(404).json({ message: 'Dastavka not found' });
      }
      res.status(200).json(updatedDastavka);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});


router.delete('/:id', async (req, res) => {
<<<<<<< HEAD
    const { id } = req.params;
    try {
        const deletedDastavka = await Dastavka.findByIdAndDelete(id);
        if (!deletedDastavka) return res.status(404).json({ message: 'Dastavka not found' });
        res.status(200).json({ message: 'Dastavka deleted successfully', dastavka: deletedDastavka });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Dastavka', error: error.message });
    }
=======
   try {
      const deletedDastavka = await Dastavka.findByIdAndDelete(req.params.id);
      if (!deletedDastavka) {
         return res.status(404).json({ message: 'Dastavka not found' });
      }
      res.status(200).json({ message: 'Dastavka deleted successfully' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
>>>>>>> 3b49f0b1014006e1d92887432f15c831637fd101
});

module.exports = router;
