const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Dastavka = require('../models/DastavkaModels'); // Ensure correct model import

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/dastavka'); // Set a single destination for all file types
    },
    filename(req, file, cb) {
        const timestamp = Date.now();
        cb(null, `${timestamp}-${file.originalname}`);
    },
});

const upload = multer({ storage });


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
});

// Get all Dastavka entries
router.get('/', async (req, res) => {
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
});

// Delete a Dastavka entry by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDastavka = await Dastavka.findByIdAndDelete(id);
        if (!deletedDastavka) return res.status(404).json({ message: 'Dastavka not found' });
        res.status(200).json({ message: 'Dastavka deleted successfully', dastavka: deletedDastavka });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Dastavka', error: error.message });
    }
});

module.exports = router;
