const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tutorSchema = new Schema({
    tutorFirstName: {
        type: String,
        required: true
    },
    tutorLastName: {
        type: String,
        required: true
    },
    tutorEmail: {
        type: String,
        required: true
    },
    tutorPassword: {
        type: String,
        required: true
    },
    tutorField: {
        type:String,
        required: false
    },
    tutorPrice: {
        type: Number,
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Tutor', tutorSchema)
