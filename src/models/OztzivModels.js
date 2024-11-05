const mongoose = require('mongoose')

// Define the schema
const OtzivSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
})

// Create the model
const Otziv = mongoose.model('Otziv', OtzivSchema);

module.exports = Otziv;
