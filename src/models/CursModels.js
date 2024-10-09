const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const CursSchemas = mongoose.Schema({
    kurs: {
        type: BigInt,
        required: true
    }
})

module.exports = mongoose.model('CrusDoldir', CursSchemas)