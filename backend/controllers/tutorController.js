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
        password,
        field,
        price
    } = req.body

    try {
        const [
            tutorFirstName,
            tutorLastName,
            tutorEmail,
            tutorPassword,
            tutorField,
            tutorPrice
        ] = [
            firstName,
            lastName,
            email,
            password,
            field,
            price
        ]

        const tutor = await Tutor.create({
            tutorFirstName,
            tutorLastName,
            tutorEmail,
            tutorPassword,
            tutorField,
            tutorPrice
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