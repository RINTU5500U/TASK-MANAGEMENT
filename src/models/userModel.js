const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: ['admin', 'student'],
        default: 'Admin'
    },
    title: {
        type: String,
        required: true,
        enum: ["Mr", "Mrs", "Miss"],
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase : true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: { 
        type: String,
        default: new Date()
    },
    updatedAt: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('User', userSchema) 
