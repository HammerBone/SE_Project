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

const filterTutor = async (req, res) => {
    try {
        let field = req.query.field || "All"

        const TutorField = require('../models/tutorFieldModel')
        const tutorFieldData = await TutorField.find({}, {  tutorFieldName: 1, _id: 0 })

        const tutorFieldName = tutorFieldData.map( (res) => res.tutorFieldName)


        field === "All" 
            ? (field = [...tutorFieldName]) 
            : (field = req.query.field.split(","))

        const filteredTutorData = await Tutor.find({})
            .where("tutorField")
            .in([...field])

        res.status(200).json(filteredTutorData)
    } 
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getAllTutor,
    createTutor,
    filterTutor
}