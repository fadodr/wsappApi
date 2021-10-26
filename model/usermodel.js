const mongoose = require('mongoose')


const userschema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
        unique: true
    },
    institution: {
        type : String,
        required: true
    },
    department: {
        type : String,
        required: true
    },
    email: {
        type : String,
        required : true
    },
    
    password: {
        type: String,
        required: true,
    },
    category: {
        type : String,
        required: true
    },
})

module.exports = mongoose.model('Users', userschema)