const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema  = new Schema({
    studentFirstName: {
        type: String
    },
    studentLastName: {
        type: String
    },
    studentEmail: {
        type: String
    },
    studentPassword: {
        type: String
    },
    bookedTutor: [
        {
            tutorId: {
                type: mongoose.Schema.Types.ObjectId
            }
        }
    ]
} ,{ timestamps: true });

module.exports = mongoose.model("StudentModel", studentSchema);