const mongoose = require('mongoose');

const BannerModels = new mongoose.Schema({
 
  image_url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },


});

const Baner = mongoose.model('Baner', BannerModels);

module.exports = Baner;
