const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    due_date: {
        type: Date,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending','overdue', 'completed'],
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

module.exports = mongoose.model('Task', taskSchema) 
