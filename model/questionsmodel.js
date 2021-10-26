const mongoose = require('mongoose')

const questionschema = new mongoose.Schema({
    course : {
        type: String,
        required: true
    },
    question : {
        type : String,
        required : true
    },
    options: [
        {
            text: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                default: false
            }
        }
    ]
})

module.exports = mongoose.model('Questions', questionschema)