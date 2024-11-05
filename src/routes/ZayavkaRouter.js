const express = require('express');
const ZayavkaModel = require('../models/ZayavkaModel');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const Zayavka = await ZayavkaModel.find(); // Fix: Await the query
        res.status(200).json({'message': "get all data successfully", "data": Zayavka});
    } catch (err) {
        res.status(500).json({'message': "Error getting all data", "error": err.message});
    }
});

router.post('/create', async (req, res) => {
    const { name, phone, email, comment } = req.body;
    try {
        const newZayavka = new ZayavkaModel({ name, phone, email, comment });
        await newZayavka.save();
        res.status(201).json({'message': "Zayavka created successfully", "data": newZayavka});
    } catch (err) {
        res.status(500).json({'message': "Error creating Zayavka", "error": err.message});
    }
});

module.exports = router;
