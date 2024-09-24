const express = require('express');
const bcrypt = require('bcrypt'); 
const AdminModels = require('../models/AdminModels');
const router = express.Router();


// Login route
router.post('/login', async (req, res) => {
    const { name, password } = req.body; 
    try {
        const admin = await AdminModels.findOne({ name });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        res.json({ message: 'Logged in successfully', admin });
    } catch (err) {
        res.status(500).json({ message: 'Error during login', error: err.message });
    }
});


router.post('/create-partner', async (req, res) => {
    const { name, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 7);
        if (!hashedPassword) {
            return res.status(500).json({ message: 'Error hashing password' });
        }

        const newAdmin = await AdminModels.create({ name, password: hashedPassword, role });
        res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
    } catch (err) {
        res.status(500).json({ message: 'Error creating admin', error: err.message });
    }
});

module.exports = router;
