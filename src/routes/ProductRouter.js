const express = require('express');
const multer = require('multer');
const Product = require('../models/ProductModels');
<<<<<<< HEAD
=======
const path = require('path');

>>>>>>> 3b49f0b1014006e1d92887432f15c831637fd101
const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.mimetype === 'application/pdf') {
<<<<<<< HEAD
      cb(null, 'uploads/pdf');
    } else {
      cb(null, 'uploads/cart');
=======
      cb(null, 'uploads/pdfs');
    } else {
      cb(null, 'uploads/images');
>>>>>>> 3b49f0b1014006e1d92887432f15c831637fd101
    }
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

<<<<<<< HEAD
// CREATE Product
router.post(
  '/create',
  upload.fields([
    { name: 'main_images', maxCount: 5 }, // Separate field for main images
    { name: 'all_images', maxCount: 10 }, // Separate field for all images
    { name: 'product_info_pdf', maxCount: 1 }
  ]),
  async (req, res) => {
    const { name, category, rating, price, volume, description, discount_price, promotion, stock, ruler, oils_type, fidbek } = req.body;

    // Collect file paths for main_images, all_images, and PDF
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
          main_images,  // Array of main image paths
          all_images,   // Array of all image paths
        },
        product_info_pdf,
        discount_price,
        promotion,
        oils_type,
      });

      await newProduct.save();
      res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: 'Error creating product', error: error.message });
    }
=======
// CREATE a new product
router.post('/create', upload.fields([{ name: 'main_images', maxCount: 5 }, { name: 'product_info_pdf', maxCount: 1 }]), async (req, res) => {
  const { name, category, rating, price, volume, stock, ruler, description, fidbek, discount_price, promotion, oils_type, bestseller } = req.body;
  const mainImages = req.files['main_images'] ? req.files['main_images'].map(file => file.path) : [];
  const productInfoPdf = req.files['product_info_pdf'] ? req.files['product_info_pdf'][0].path : '';

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
        main_images: mainImages,
        all_images: mainImages, // For demonstration, using the same images array
      },
      product_info_pdf: productInfoPdf,
      discount_price,
      promotion,
      bestseller,
      oils_type,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
>>>>>>> 3b49f0b1014006e1d92887432f15c831637fd101
  }
);

// READ all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// READ a product by ID
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

// UPDATE a product by ID
router.put('/:id', upload.fields([{ name: 'main_images', maxCount: 5 }, { name: 'product_info_pdf', maxCount: 1 }]), async (req, res) => {
  const { id } = req.params;
  const { name, category, rating, price, volume, stock, ruler, description, discount_price, promotion, oils_type, bestseller } = req.body;
  const mainImages = req.files['main_images'] ? req.files['main_images'].map(file => file.path) : null;
  const productInfoPdf = req.files['product_info_pdf'] ? req.files['product_info_pdf'][0].path : null;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        category,
        rating,
        price,
        volume,
        stock,
        ruler,
        description,
        image: mainImages ? { main_images: mainImages, all_images: mainImages } : undefined,
        product_info_pdf: productInfoPdf || undefined,
        discount_price,
        promotion,
        oils_type,
        bestseller,
      },
      { new: true, omitUndefined: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

// DELETE a product by ID
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
