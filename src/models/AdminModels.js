// models/Admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Path `username` is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Path `password` is required.']
    },
    role: {
        type: String,
        required: [true, 'Path `role` is required.'],
        enum: ['admin', 'user'],
        default: 'admin'
    }
});

// Pre-save hook to hash password
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('Admin', adminSchema);
