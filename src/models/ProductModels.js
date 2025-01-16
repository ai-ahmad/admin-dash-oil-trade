const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true },
  volume: { type: Array, required: false },
  stock: { type: Number, required: true, default: 0 },
  image: {
    main_images: { type: [String], required: true },
    all_images: { type: [String], required: true },
  },
  ruler: { type: String, required: false },
  description: { type: String, required: true },
  fidbek: { type: Array },
  discount_price: { type: String, default: 0 },
  promotion: { type: Boolean },
  bestseller: { type: Boolean },
  oils_type: { type: String },
  product_info_pdf: { type: String },
});

module.exports = mongoose.model('Product', productSchema);
