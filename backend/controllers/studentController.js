const { default: moongoose } = require('mongoose')
const Student = require('../models/studentModel');
const Tutor = require('../models/tutorModel')
const bcrypt = require('bcrypt')
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
            studentLastName,
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
            studentLastName,
            studentEmail,
            studentPassword
        });
        
        const token = generateToken(student._id)

        res.status(200).json({ studentEmail: studentEmail, userRole: 'student',token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getAllStudent = async (req, res) => {
    try {
        const studentData = await Student.find({});

        res.status(200).json(studentData);
    } 
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getStudentByEmail = async (req, res) => {
    try {
        const { studentEmail } = req.body;

        const studentData = await Student.findOne({ studentEmail: studentEmail }, {});

        res.status(200).json(studentData);

    } 
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const studentValidation = async (req,res) => {
    const { username, password } = req.body;
    try {
        const user = await Student.findOne({ studentEmail: username });

        if (user) {
            const hash = await bcrypt.hash(user.studentPassword,0)
            const isMatch = await bcrypt.compare(password, hash);
            
            if (isMatch) {
                const token = generateToken(user._id);

                res.status(200).json({ studentEmail: username, userRole: 'student', token, message: 'Login successful' });
            } 
            else {
                res.status(401).json({ message: 'Invalid username or password' });
            }
        } 
        else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } 
    catch (error) {
        res.status(500).json({ message: 'An error occurred during the login process' });
    }
}

const bookTutor = async (req, res) => {
    const { studentEmail, tutorId } = req.body;

    const addBookedTutor = await Student.findOneAndUpdate({studentEmail: studentEmail}, 
        {
            $push: {
                bookedTutor: {
                    tutorId: tutorId
                }
            }
        }
    );

    res.status(200).json(addBookedTutor);
}

const getBoookedTutor = async (req, res) => {
    const { studentEmail } = req.body;

    let bookedTutorData = await Student.findOne(
        { studentEmail: studentEmail }, 
        { bookedTutor: 1, _id: 0 })
    
    bookedTutorData = bookedTutorData.bookedTutor.map((response) => response.tutorId)

    bookedTutorData = [...bookedTutorData]

    const bookedTutorName = await Tutor.find({ _id: bookedTutorData }, { tutorFirstName: 1, tutorField: 1 })

    res.status(200).json(bookedTutorName);
}

module.exports = {
    createStudent,
    getAllStudent,
    getStudentByEmail,
    studentValidation,
    bookTutor,
    getBoookedTutor
}