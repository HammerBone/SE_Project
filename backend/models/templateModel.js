const mongoose = require('mongoose')

const Schema = mongoose.Schema

const templateSchema = new Schema({
    templateName: {
        type: String,
        required: true
    },
    templateEmail: {
        type: String,
        required: true
    },
    templatePassword: {
        type: String,
        required: true
    },
    templatePhone: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Template', templateSchema)

