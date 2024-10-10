const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Contact = require('../models/ContactModels');

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/contact'); // Set a single destination
    },
    filename(req, file, cb) {
        const timestamp = Date.now();
        cb(null, `${timestamp}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Create a new contact
router.post('/create', upload.fields([{ name: 'images', maxCount: 5 }]), async (req, res) => {
    const { name, description } = req.body;
    const images = req.files['images'] ? req.files['images'].map(file => file.path) : [];
    try {
        const newContact = new Contact({
            name: name,
            description: description,
            images: images, // Use 'images' for the field name
        });
        await newContact.save();
        res.status(201).json({ message: 'Contact created successfully', contact: newContact });
    } catch (error) {
        res.status(500).json({ message: 'Error creating contact', error: error.message });
    }
});

// Get all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        if (!contacts.length) return res.status(404).json({ message: 'No contacts found' });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contacts', error: error.message });
    }
});

// Update a contact by ID
router.put('/:id', upload.fields([{ name: 'images', maxCount: 5 }]), async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const images = req.files['images'] ? req.files['images'].map(file => file.path) : [];

    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            { 
                name,
                description,
                images: images.length ? images : undefined, // Update images only if they exist
            },
            { new: true, omitUndefined: true }  
        );
        if (!updatedContact) return res.status(404).json({ message: 'Contact not found' });
        res.status(200).json({ message: 'Contact updated successfully', contact: updatedContact });
    } catch (error) {
        res.status(500).json({ message: 'Error updating contact', error: error.message });
    }
});

// Delete a contact by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedContact = await Contact.findByIdAndDelete(id);
        if (!deletedContact) return res.status(404).json({ message: 'Contact not found' });
        res.status(200).json({ message: 'Contact deleted successfully', contact: deletedContact });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting contact', error: error.message });
    }
});

module.exports = router;
