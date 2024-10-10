const express = require('express');
const About = require('../models/AboutShopModels');
const router = express.Router();

// Get all About entries
router.get('/', async (req, res) => {
    try {
        const about = await About.find();
        res.json(about);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving About entries" });
    }
});

// Create a new About entry
router.post('/create', async (req, res) => {
    const { name, description } = req.body;
    try {
        const about = new About({ name, description });
        await about.save();
        res.status(201).json({ message: "Create About successfully", data: about });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete an About entry
router.delete('/delete', async (req, res) => {
    const { id } = req.body;
    try {
        const deletedAbout = await About.findByIdAndDelete(id);
        if (!deletedAbout) {
            return res.status(404).json({ message: "About not found" });
        }
        res.status(200).json({ message: "Delete About successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting About" });
    }
});

// Update an About entry
router.put('/update', async (req, res) => {
    const { id, name, description } = req.body;
    try {
        const updatedAbout = await About.findByIdAndUpdate(
            id,
            { name, description },
            { new: true } // Return the updated document
        );
        if (!updatedAbout) {
            return res.status(404).json({ message: "About not found" });
        }
        res.status(200).json({ message: "Update About successfully", data: updatedAbout });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
