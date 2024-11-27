const mongoose = require('mongoose');

// Schema
const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    ConfirmPassword: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);
