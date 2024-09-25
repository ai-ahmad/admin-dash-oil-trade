const express = require('express');
const multer = require('multer');
const Product = require('../models/ProductModels'); 

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/cart'); 
    },
    filename(req, file, cb) {
      const timestamp = Date.now(); 
      cb(null, `${timestamp}-${file.originalname}`);
    },
  });

const upload = multer({ storage });

// CREATE Product
router.post('/create', upload.array('images', 5), async (req, res) => {
    const { name, category, rating, price, volume, description, discount_price, promotion, stock, ruler, oils_type, fidbek } = req.body;
    
    // Collect file paths for the images
    const images = req.files ? req.files.map(file => file.path) : [];

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
        image: images, // Store the array of image paths
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
  
  // READ a single Product by ID
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
  });
  
  // UPDATE Product by ID
  router.put('/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name, category, rating, price, volume, description, discount } = req.body;
    const image = req.file ? req.file.path : null;
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, category, rating, price, volume, image: image || undefined, description, discount },
        { new: true, omitUndefined: true } // `omitUndefined` ensures only provided fields are updated
      );
      if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
      res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error: error.message });
    }
  });
  
  // DELETE Product by ID
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
      res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
  });
  
  module.exports = router;
