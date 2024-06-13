const { default: moongoose } = require('mongoose')
const Student = require('../models/studentModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ _id: id }, process.env.APPID, { expiresIn: "2d" })
}

const createStudent = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
        } = req.body;
    
        const [
            studentFirstName,
            sudentLastName,
            studentEmail,
            studentPassword
        ] = [
            firstName,
            lastName,
            email,
            password,
        ]
    
        const student = await Student.create({
            studentFirstName,
            sudentLastName,
            studentEmail,
            studentPassword
        });
        
        const token = generateToken(student._id)

        res.status(200).json({token})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createStudent
}