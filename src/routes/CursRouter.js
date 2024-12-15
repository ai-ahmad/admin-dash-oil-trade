const express = require('express');
const router = express.Router();
const Curs = require('../models/CursModels');

// Add a new Curs (POST route)
router.post('/add', async (req, res) => {
  try {
    const newCurs = new Curs({
      name: req.body.name, // Example field, modify based on your model
      description: req.body.description, // Example field, modify based on your model
    });
    
    const savedCurs = await newCurs.save();
    res.status(201).json(savedCurs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all Curs (GET route)
router.get('/', async (req, res) => {
  try {
    const curs = await Curs.find();
    res.status(200).json(curs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific Curs by ID (GET route)
router.get('/:id', async (req, res) => {
  try {
    const curs = await Curs.findById(req.params.id);
    if (!curs) {
      return res.status(404).json({ message: 'Curs not found' });
    }
    res.status(200).json(curs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a Curs by ID (PUT route)
router.put('/update/:id', async (req, res) => {
  try {
    const updatedCurs = await Curs.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, // Automatically update fields based on the request body
      },
      { new: true } // Return the updated document
    );
    
    if (!updatedCurs) {
      return res.status(404).json({ message: 'Curs not found' });
    }
    
    res.status(200).json(updatedCurs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
