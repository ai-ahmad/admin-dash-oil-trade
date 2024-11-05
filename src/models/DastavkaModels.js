const mongoose = require('mongoose');

const DastavkaSchemas = mongoose.Schema({
   name: {
    type: String,
    required: true
   },
   description: {
    type: String,
    required: true
   },
   images: {
    type: [],
    required: true,
   }
})

module.exports = mongoose.model('Dastavka', DastavkaSchemas)