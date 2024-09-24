const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fidbek: {
    type: Array,
    required: false,
  },
  discount: {
    type: Boolean,
    required: false,
    default: 0,
  },
  promotion: {
    type: Boolean,
    required: false,
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
