const express = require('express');
const multer = require('multer');
const Dastavka = require('../models/DastavkaModels');
const path = require('path');

const router = express.Router();

// Multer configuration for image uploads
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'uploads/dastavka'); // Directory to save images
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
   }
});

const upload = multer({ storage: storage });

// @route   POST /api/v1/dastavka
// @desc    Create a new dastavka
// @access  Public
router.post('/create', upload.array('images', 5), async (req, res) => {
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
});

// @route   GET /api/v1/dastavka
// @desc    Get all dastavkas
// @access  Public
router.get('/', async (req, res) => {
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
   try {
      const deletedDastavka = await Dastavka.findByIdAndDelete(req.params.id);
      if (!deletedDastavka) {
         return res.status(404).json({ message: 'Dastavka not found' });
      }
      res.status(200).json({ message: 'Dastavka deleted successfully' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

module.exports = router;
