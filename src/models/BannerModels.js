const mongoose = require('mongoose');

const BanerRouter = new mongoose.Schema({
 
  image_url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },


});

const Baner = mongoose.model('Baner', BanerRouter);

module.exports = Product;
