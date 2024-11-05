const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const AboutShopSchemas = mongoose.Schema({
   name: {
    type: String,
    required: true
   },
   description: {
    type: String,
    required: true
   }
})

module.exports = mongoose.model('AboutShop', AboutShopSchemas)