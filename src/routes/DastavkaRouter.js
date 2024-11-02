const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Dastavka = require('../models/DastavkaModels'); // Ensure correct model import

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/dastavka'); // Set a single destination for all file types
    },
    filename(req, file, cb) {
        const timestamp = Date.now();
        cb(null, `${timestamp}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Create a new Dastavka entry
// CREATE Product
router.post('/create', upload.fields([{ name: 'main_images', maxCount: 1 }, { name: 'all_images', maxCount: 5 }, { name: 'product_info_pdf', maxCount: 1 }]), async (req, res) => {
    const { name, category, rating, price, volume, description, discount_price, promotion, stock, ruler, oils_type, fidbek } = req.body;
    const main_images = req.files['main_images'] ? req.files['main_images'].map(file => file.path) : [];
    const all_images = req.files['all_images'] ? req.files['all_images'].map(file => file.path) : [];
    const product_info_pdf = req.files['product_info_pdf'] ? req.files['product_info_pdf'][0].path : '';
  
    try {
      const newProduct = new Product({
        name, 
        category, 
        rating, 
        price, 
        volume, 
        stock, 
        ruler, 
        description, 
        fidbek, 
        image: {
          main_images,
          all_images
        },
        product_info_pdf,  
        discount_price,
        promotion,
        oils_type
      });
  
      await newProduct.save();
      res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });

    }
  });
  

// Get all Dastavka entries
router.get('/', async (req, res) => {
    try {
        const dastavkaList = await Dastavka.find();
        if (!dastavkaList.length) return res.status(404).json({ message: 'No Dastavka found' });
        res.status(200).json(dastavkaList);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dastavka', error: error.message });
    }
});

// Update a Dastavka entry by ID
router.put('/:id', upload.fields([{ name: 'images', maxCount: 5 }]), async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const images = req.files['images'] ? req.files['images'].map(file => file.path) : [];

    try {
        const updatedDastavka = await Dastavka.findByIdAndUpdate(
            id,
            { 
                name,
                description,
                images: images.length ? images : undefined, // Update images only if they exist
            },
            { new: true, omitUndefined: true }
        );
        if (!updatedDastavka) return res.status(404).json({ message: 'Dastavka not found' });
        res.status(200).json({ message: 'Dastavka updated successfully', dastavka: updatedDastavka });
    } catch (error) {
        res.status(500).json({ message: 'Error updating dastavka', error: error.message });
    }
});

// Delete a Dastavka entry by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDastavka = await Dastavka.findByIdAndDelete(id);
        if (!deletedDastavka) return res.status(404).json({ message: 'Dastavka not found' });
        res.status(200).json({ message: 'Dastavka deleted successfully', dastavka: deletedDastavka });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting dastavka', error: error.message });
    }
});

module.exports = router;
