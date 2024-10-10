const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Zakaz =require('../models/ZakazModels')

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.mimetype === 'application/zakaz') {
      cb(null, 'uploads/zakaz'); 
    } else {
      cb(null, 'uploads/zakaz');  
    }
  },
  filename(req, file, cb) {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/create', upload.fields([{ name: 'images', maxCount: 5 }]), async (req, res) => {
  const { name,description } = req.body;
  const images = req.files['images'] ? req.files['images'].map(file => file.path) : [];
  try {
    const Zakaz = new Zakaz({
      name: name,
      description: description,
      image: images, 
    });
    await Zakaz.save();
    res.status(201).json({ message: 'Product created successfully', zakaz: Zakaz });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const Zakaz = await Zakaz.find()
    if (!Zakaz) return res.status(404).json({ message: 'Zakaz not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});


router.put('/:id', upload.fields([{ name: 'image', maxCount: 6 }]), async (req, res) => {
  const { id } = req.params;
  const { name,description } = req.body;
  const image = req.files['image'] ? req.files['image'][0].path : null;
  try {
    const updateZakaz = await Zakaz.findByIdAndUpdate(
      id,
      { 
        name,
        description
      },
      { new: true, omitUndefined: true }  
    );
    if (!updateZakaz) return res.status(404).json({ message: 'Zakaz not found' });
    res.status(200).json({ message: 'Zakaz updated successfully', zakaz: updateZakaz });
  } catch (error) {
    res.status(500).json({ message: 'Error updating zakaz', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteZakaz = await Zakaz.findByIdAndDelete(id);
    if (!deleteZakaz) return res.status(404).json({ message: 'Zakaz not found' });
    res.status(200).json({ message: 'Product deleted successfully', zakaz: deleteZakaz });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

module.exports = router;