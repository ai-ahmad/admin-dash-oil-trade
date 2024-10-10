const mongoose = require('mongoose');

const ContactSchemas = mongoose.Schema({
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

module.exports = mongoose.model('Contact', ContactSchemas)