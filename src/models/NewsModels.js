const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description1: {
        type: String
    },
    description2: {
        type: String
    },
    date: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    }
});

const NewsModels = mongoose.model('News', NewsSchema);

module.exports = NewsModels;
