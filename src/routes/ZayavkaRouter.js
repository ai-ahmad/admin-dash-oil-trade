const express = require('express');
const ZayavkaModel = require('../models/ZayavkaModel');
const router = express.Router();

// GET all applications
router.get('/', async (req, res) => {
    try {
        const Zayavka = await ZayavkaModel.find();
        res.status(200).json({ 'message': "Get all data successfully", "data": Zayavka });
    } catch (err) {
        res.status(500).json({ 'message': "Error getting all data", "error": err.message });
    }
});

// POST create a new application
router.post('/create', async (req, res) => {
    const { name, phone, email, comment } = req.body;
    try {
        const newZayavka = new ZayavkaModel({ name, phone, email, comment });
        await newZayavka.save();
        res.status(201).json({ 'message': "Zayavka created successfully", "data": newZayavka });
    } catch (err) {
        res.status(500).json({ 'message': "Error creating Zayavka", "error": err.message });
    }
});

// DELETE route to delete an application by ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(`Received request to delete application with ID: ${id}`);
    
    try {
        const deletedZayavka = await ZayavkaModel.findByIdAndDelete(id);
        if (!deletedZayavka) {
            console.log("No application found with that ID");
            return res.status(404).json({ message: "Zayavka not found" });
        }
        res.status(200).json({ message: "Zayavka deleted successfully", data: deletedZayavka });
    } catch (err) {
        console.error('Error deleting Zayavka:', err.message);
        res.status(500).json({ message: "Error deleting ", error: err.message });
    }
});

module.exports = router;
