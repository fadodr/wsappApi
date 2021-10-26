const mongoose = require('mongoose')

const institutionschema = new mongoose.Schema({
    institution:{
        type: String,
        required : true
    }
})

module.exports = mongoose.model('Institutions', institutionschema)