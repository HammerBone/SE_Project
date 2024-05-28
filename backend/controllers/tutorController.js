const { default: mongoose } = require('mongoose')
const Tutor = require('../models/tutorModel')

// get user Tutor
const getAllTutor = async (req, res) => {
    try {
        const tutor = await Tutor.find({});
        res.status(200).json(tutor)
    }
    catch (error){
        res.status(400).json({ error: error.message })
    }
}

// create user Tutor
const createTutor = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password
    } = req.body

    try {
        const [
            tutorFirstName,
            tutorLastName,
            tutorEmail,
            tutorPassword
        ] = [
            firstName,
            lastName,
            email,
            password
        ]

        const tutor = await Tutor.create({
            tutorFirstName,
            tutorLastName,
            tutorEmail,
            tutorPassword
        })
        res.status(200).json(tutor)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getAllTutor,
    createTutor
}