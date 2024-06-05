const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tutorFieldSchema = new Schema({
    tutorFieldName: {
        type: String
    }
})

module.exports = mongoose.model('TutorField', tutorFieldSchema)