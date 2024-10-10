const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Contact =require('../models/ContactModels')

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.mimetype === 'application/contact') {
      cb(null, 'uploads/contact'); 
    } else {
      cb(null, 'uploads/contact');  
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
    const Contact = new Contact({
      name: name,
      description: description,
      image: images, 
    });
    await Contact.save();
    res.status(201).json({ message: 'Product created successfully', Contact: Contact });
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const Contact = await Contact.find()
    if (!Contact) return res.status(404).json({ message: 'contact not found' });
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
    if (!updateZakaz) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json({ message: 'Contact updated successfully', zakaz: updateZakaz });
  } catch (error) {
    res.status(500).json({ message: 'Error updating Contact', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const Contact = await Zakaz.findByIdAndDelete(id);
    if (!Contact) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json({ message: 'Product deleted successfully', Contact: Contact });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

module.exports = router;