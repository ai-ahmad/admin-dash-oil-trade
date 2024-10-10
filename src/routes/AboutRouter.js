const express = require('express');
const bcrypt = require('bcrypt'); 
const About = require('../models/AboutShopModels');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
       let about = await About.find()
       res.json(about)
    }catch (err) {
        res.status(500).json({message: "error"})
    }
})


router.post('/create', async (req, res) => {
    const { name, description} =  req.body;
    try {
        const About = await About(name,description)
        res.status(201).json({message: "Create About successfully"})
    }catch (err) {
        res.status(500).json({message: "error"})
    }
})


router.delete('/delete', async (req, res) => {
    const { id } = req.body;
    try {
        await About.findByIdAndDelete(id)
        res.status(200).json({message: "Delete About successfully"})
    }catch (err) {
        res.status(500).json({message: "error"})
    }
})

router.put('/update', async (req, res) => {
    const { id, name, description } = req.body;
    try {
        const updatedAbout = await About.findByIdAndUpdate(id, { name, description }, {new: true})
        res.status(200).json({message: "Update About successfully"})
    }catch (err) {
        res.status(500).json({message: "error"})
    }
})

module.exports = router;
