const express = require('express')
const Otziv = require('../models/OztzivModels')
const router = express.Router()

// Get all Otzivs
router.get('/', async (req, res) => {
    try {
        const otzivs = await Otziv.find()
        res.status(200).json(otzivs)
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message })
    }
})

// Create a new Otziv
router.post('/create', async (req, res) => {
    const { name, date, rating, comment } = req.body

    try {
        // Correct way to create a new document
        const newOtziv = new Otziv({
            name,
            date,
            rating,
            comment
        })

        // Save the new document to the database
        await newOtziv.save()
        
        res.status(201).json({ message: 'Created successfully', data: newOtziv })
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message })
    }
})

// Delete an Otziv by ID
router.delete('/delete', async (req, res) => {
    const { id } = req.body
    try {
        const deletedOtziv = await Otziv.findByIdAndDelete(id)
        if (!deletedOtziv) {
            return res.status(404).json({ message: 'Not found' })
        }
        res.status(200).json({ message: 'Deleted successfully',data: deletedOtziv})
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message})
    }
})

module.exports = router
