const mongoose = require('mongoose')

const departmentschema = new mongoose.Schema({
    faculty : {
        type : String,
        required : true
    },
    courses : [
        {
            code:{
                type : String,
                required: true
            },
            title:{
                type : String,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model('Faculty', departmentschema)