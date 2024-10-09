const mongoose = require('mongoose');
const AnnosSchema = mongoose.Schema({
    images_annos: {
        type: Array,
        required: true,
        validate: {
            validator: function(value) {S
                return value.length >= 1 && value.length <= 6;
            },
            message: 'The number of images should be between 1 and 6.'
        }
    }
});

module.exports = mongoose.model('Annos', AnnosSchema);
