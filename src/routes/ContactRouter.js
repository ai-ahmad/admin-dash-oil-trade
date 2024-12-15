const express = require('express');
const multer = require('multer');
const Contact = require('../models/ContactModels');
const path = require('path');

const router = express.Router();

// Multer configuration for image upload
const storage = multer.diskStorage({
<<<<<<< HEAD
    destination(req, file, cb) {
        cb(null, 'uploads/contact'); // Set a single destination
    },  
    filename(req, file, cb) {
        const timestamp = Date.now();
        cb(null, `${timestamp}-${file.originalname}`);
    },
=======
   destination: function (req, file, cb) {
      cb(null, 'uploads/contact');
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
   }
>>>>>>> 3b49f0b1014006e1d92887432f15c831637fd101
});

const upload = multer({ storage: storage });

// Create a new contact
router.post('/create', upload.array('images', 5), async (req, res) => {
   try {
      const imagePaths = req.files.map(file => file.path);
      const contact = new Contact({
         name: req.body.name,
         description: req.body.description,
         images: imagePaths
      });
      const savedContact = await contact.save();
      res.status(201).json(savedContact);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// Get all contacts
router.get('/', async (req, res) => {
   try {
      const contacts = await Contact.find();
      res.status(200).json(contacts);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// Get a contact by ID
router.get('/:id', async (req, res) => {
   try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) {
         return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(200).json(contact);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// Update a contact by ID
router.put('/:id', upload.array('images', 5), async (req, res) => {
   try {
      const imagePaths = req.files.map(file => file.path);
      const updatedContact = await Contact.findByIdAndUpdate(
         req.params.id,
         {
            name: req.body.name,
            description: req.body.description,
            images: imagePaths.length > 0 ? imagePaths : req.body.images // Keep existing if no new images uploaded
         },
         { new: true }
      );
      if (!updatedContact) {
         return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(200).json(updatedContact);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// Delete a contact by ID
router.delete('/:id', async (req, res) => {
   try {
      const deletedContact = await Contact.findByIdAndDelete(req.params.id);
      if (!deletedContact) {
         return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(200).json({ message: 'Contact deleted successfully' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

module.exports = router;
