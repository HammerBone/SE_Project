const { default: mongoose } = require('mongoose')
const TutorField = require('../models/tutorFieldModel')

// get all
const getAllTutorField = async (req, res) => {
    const tutorFieldData = await TutorField.find({})

    res.status(200).json(tutorFieldData)
}

const createTutorField = async (req, res) => {
    const { 
        tutorFieldName 
    } = req.body

    try {
        const tutorField = await TutorField.create({ 
            tutorFieldName 
        })
        res.status(200).json(tutorField)
    } 
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getAllTutorField,
    createTutorField
}