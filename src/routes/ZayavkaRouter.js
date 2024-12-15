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



module.exports = router;
