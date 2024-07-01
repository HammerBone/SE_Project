const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tutorSchema = new Schema({
    tutorFirstName: {
        type: String,
        required: false
    },
    tutorLastName: {
        type: String,
        required: false
    },
    tutorEmail: {
        type: String,
        required: false
    },
    tutorPassword: {
        type: String,
        required: false
    },
    tutorField: {
        type:String,
        required: false
    },
    tutorSubField: {
        type:String,
        required: false
    },
    profilePicture: {
        type: String,
        required: false
    },
    educationBackground: {
        type: String,
        required: false
    },
    tutorDescription: {
        type: String,
        required: false
    },
    tutorPrice: {
        type: Number,
        required: false
    },
    tutorRating: [
        {
            rating: Number,
            review: String,
            ratedBy: String,
            studentName: String,
            date: Date
        }
    ],
    tutorTotalRating: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model('Tutor', tutorSchema)
