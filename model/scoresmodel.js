const mongoose = require('mongoose');

const scoreschema = new mongoose.Schema({
    user: {
        type: Object,
        required: true,
        ref: 'Users'
    },
    course: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required : true
    }
});

module.exports = mongoose.model('Score', scoreschema);