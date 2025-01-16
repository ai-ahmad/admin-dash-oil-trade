const express = require("express");
const multer = require("multer");
const Product = require("../models/ProductModels");
const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, "uploads/pdf");
    } else {
      cb(null, "uploads/images");
    }
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// CREATE a Product
router.post(
  "/create",
  upload.fields([
    { name: "main_images", maxCount: 1 },
    { name: "all_images", maxCount: 5 },
    { name: "product_info_pdf", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    const { name, category, rating, price, stock, description,volume } = req.body;

    const mainImages = req.files["main_images"]
      ? req.files["main_images"].map((file) => file.path)
      : [];
    const allImages = req.files["all_images"]
      ? req.files["all_images"].map((file) => file.path)
      : [];
    const productInfoPdf = req.files["product_info_pdf"]
      ? req.files["product_info_pdf"][0].path
      : "";

    try {
      const newProduct = new Product({
        name,
        category,
        ruler,
        rating,
        price,
        stock,
        volume,
        description,
        image: { main_images: mainImages, all_images: allImages },
        product_info_pdf: productInfoPdf,
      });

      const savedProduct = await newProduct.save();
      res.status(201).json({
        message: "Product created successfully",
        product: savedProduct,
      });
    } catch (error) {
      console.error("Error saving product:", error.message);
      res
        .status(500)
        .json({ message: "Error saving product", error: error.message });
    }
  }
);

// READ All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

// READ a Product by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
});

// UPDATE a Product by ID
router.put(
  "/:id",
  upload.fields([
    { name: "main_images", maxCount: 5 },
    { name: "product_info_pdf", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log("Request Body:", req.body); // Debugging logs
    console.log("Uploaded Files:", req.files);

    const { id } = req.params;
    const { name, category, rating, price, stock,volume, description } = req.body;

    const mainImages = req.files["main_images"]
      ? req.files["main_images"].map((file) => file.path)
      : null;
    const allImages = req.files["all_images"]
      ? req.files["all_images"].map((file) => file.path)
      : [];
    const productInfoPdf = req.files["product_info_pdf"]
      ? req.files["product_info_pdf"][0].path
      : null;

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          name,
          category,
          rating,
          price,
          stock,
          description,
          volume,
          image: mainImages ? { main_images: mainImages } : undefined,
          product_info_pdf: productInfoPdf || undefined,
        },
        { new: true, omitUndefined: true }
      );

      if (!updatedProduct)
        return res.status(404).json({ message: "Product not found" });
      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Error updating product:", error.message);
      res
        .status(500)
        .json({ message: "Error updating product", error: error.message });
    }
  }
);

// DELETE a Product by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
});

module.exports = router;
