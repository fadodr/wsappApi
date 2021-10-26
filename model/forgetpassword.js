const mongoose = require('mongoose')

const forgetpwdschema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    token : {
        type: String,
        required : true,
    },
    expiresIn : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Forgetpassword', forgetpwdschema)