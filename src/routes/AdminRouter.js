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

// controllers/adminController.js
const Admin = require('../models/Admin');

const createAdmin = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password || !role) {
            return res.status(400).json({ message: 'All fields (username, password, role) are required.' });
        }

        const admin = new Admin({ username, password, role });
        await admin.save();

        res.status(201).json({ message: 'Admin created successfully', admin: { username: admin.username, role: admin.role } });
    } catch (error) {
        res.status(500).json({ message: 'Error creating admin', error: error.message });
    }
};

module.exports = { createAdmin };

    module.exports = router;
