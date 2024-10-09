const express = require('express');
const router = express.Router();
const Annos = require('../models/AnonsModels');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = 'uploads/annons';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed!'));
    }
});

// CREATE: Create a new Anno (with image upload)
router.post('/create', upload.array('images_annos', 6), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const images = req.files.map(file => file.path);

        if (images.length < 1 || images.length > 6) {
            return res.status(400).json({ message: 'You must provide between 1 and 6 images.' });
        }

        const newAnno = new Annos({ images_annos: images });
        const savedAnno = await newAnno.save();
        res.status(201).json(savedAnno);
    } catch (err) {
        if (err instanceof multer.MulterError) {
            // Multer-specific errors
            return res.status(400).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
});

// READ: Get all Annos
router.get('/', async (req, res) => {
    try {
        const annos = await Annos.find();
        res.status(200).json(annos);
    } catch (err) { 
        res.status(500).json({ message: err.message });
    }
});

// READ: Get a specific Anno by ID
router.get('/:id', async (req, res) => {
    try {
        const anno = await Annos.findById(req.params.id);
        if (!anno) {
            return res.status(404).json({ message: 'Anno not found' });
        }
        res.status(200).json(anno);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// UPDATE: Update an Anno (with image upload)
router.put('/update/:id', upload.array('images_annos', 6), async (req, res) => {
    try {
        const anno = await Annos.findById(req.params.id);
        if (!anno) {
            return res.status(404).json({ message: 'Anno not found' });
        }

        let images = anno.images_annos; // Existing images

        // If new files are uploaded, replace the images
        if (req.files && req.files.length > 0) {
            // Optionally, delete old images from the filesystem here
            images = req.files.map(file => file.path);
        }

        // Validate the number of images
        if (images.length < 1 || images.length > 6) {
            return res.status(400).json({ message: 'You must provide between 1 and 6 images.' });
        }

        anno.images_annos = images;
        const updatedAnno = await anno.save();
        res.status(200).json(updatedAnno);
    } catch (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
});

// DELETE: Delete an Anno
router.delete('/delete/:id', async (req, res) => {
    try {
        const anno = await Annos.findById(req.params.id);
        if (!anno) {
            return res.status(404).json({ message: 'Anno not found' });
        }
        await Annos.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Anno deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
