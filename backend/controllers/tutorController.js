const { default: mongoose } = require('mongoose');
const Tutor = require('../models/tutorModel');
const Student = require('../models/studentModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const generateToken = (id) => {
    return jwt.sign({ _id: id }, process.env.APPID, { expiresIn: '2d' })
}

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

        const token = generateToken(tutor._id)

        res.status(200).json({tutorEmail, userRole: 'tutor', token})
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const insertTutorProfilePicture = (req, res) => {
    const { path, filename, originalname } = req.file;

    const part = originalname.split('.');
    const fileExt = part[part.length - 1];
    const newName = filename + '.' + fileExt

    fs.renameSync(path, "uploads/" + newName)
    console.log(newName);

    res.json(newName);
}

const createTutorProfile = async (req, res) => {
    
    try {
        const {
            tutorField, 
            tutorSubField, 
            profilePicture,
            educationBackground,
            tutorDescription, 
            tutorPrice,
            tutorEmail
        } = req.body;

        const tutorProfile = await Tutor.updateOne({ "tutorEmail" : tutorEmail }, {
            tutorField, 
            tutorSubField, 
            profilePicture, 
            educationBackground,
            tutorDescription, 
            tutorPrice
        });
        
        res.status(200).json(tutorProfile);
    } catch (error) {
        res.status(400).json(error.message)
    }
    
}

//validating tutor login
const tutorValidation = async (req,res) =>{
  const { username, password } = req.body;
  try {
    console.log(req.body)
    // Find the user by their username
    const user = await Tutor.findOne({ tutorEmail: username });
    console.log(user)
    if (user) {
      // Compare the provided password with the hashed password in the database
      const hash = await bcrypt.hash(user.tutorPassword,0)
      const isMatch = await bcrypt.compare(password, hash);
      
      if (isMatch) {
        // Authentication successful
        const token = generateToken(user._id);

        res.status(200).json({ tutorEmail: username, userRole: 'tutor', token, message: 'Login successful' });
      } 
      else {
        // Authentication failed
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } else {
      // User not found
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during the login process' });
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

const getTutorById = async (req, res) => {
    const { id } = req.params;

    const tutorData = await Tutor.findOne({ _id: id });

    res.status(200).json(tutorData)
}

const getTutorByEmail = async (req, res) => {
    try {
        
        const { tutorEmail }  = req.body;

        const TutorData = await Tutor.findOne({ tutorEmail: tutorEmail }, {});

        res.status(200).json(TutorData);
    } 
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteTutorByEmail = async (req, res) => {
    try {
        const { tutorEmail } = req.body;

        const TutorData = await Tutor.findOneAndDelete({ tutorEmail: tutorEmail });

        if(!TutorData){
            res.status(200).json("Data not exist!");
        }
        else {
            res.status(200).json("Tutor Deleted!");
        }      
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const rateTutor = async (req, res) => {
    const { studentEmail, rating, review, tutorId } = req.body;

    try {
        const getTutorData = await Tutor.findById(tutorId);
        const getStudentData = await Student.findOne({ studentEmail: studentEmail }, { _id: 0, studentFirstName: 1 })

        const { studentFirstName } = getStudentData

        let isRated = getTutorData.tutorRating.find((tutorId) => 
            tutorId.ratedBy.toString() === studentEmail.toString()
        );

        if (isRated) {
            return res.status(200).json({ message: "You already review" });
        }
        else {
            const rateTutor = await Tutor.findByIdAndUpdate(tutorId, 
                {
                    $push: {
                        tutorRating: {
                            rating: rating,
                            review: review,
                            ratedBy: studentEmail,
                            studentName: studentFirstName,
                            date: new Date()
                        }
                    }
                }, 
                {
                    new: true
                } 
            );
        }
        const getUpdatedTutorData = await Tutor.findById(tutorId);
        const totalRating = getUpdatedTutorData.tutorRating.length;

        let sumRating = getUpdatedTutorData.tutorRating
            .map((item) => item.rating)
            .reduce((prev, curr) => prev + curr, 0);
        
        let ratingValue = Math.round(sumRating / totalRating);

        let updateTutorTotalRating = await Tutor.findByIdAndUpdate(tutorId, 
            { 
                tutorTotalRating: ratingValue,
            }, 
            { new: true }
        )

        res.status(200).json(updateTutorTotalRating)
    } 
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getReview = async (req, res) => {
    const { id } = req.params;

    let tutorRatingData = await Tutor.findById(id)
    tutorRatingData = tutorRatingData.tutorRating?.map((res) => res)
    // let studentEmail = tutorRatingData.tutorRating?.map((res) => res.ratedBy)
    // let studentData  = await Student.find({ studentEmail: studentEmail }, { _id: 0, studentFirstName: 1, studentEmail: 1})
    
    res.status(200).json(tutorRatingData)
}

module.exports = {
    getAllTutor,
    createTutor,
    filterTutor,
    tutorValidation,
    insertTutorProfilePicture,
    createTutorProfile,
    getTutorById,
    getTutorByEmail,
    deleteTutorByEmail,
    rateTutor,
    getReview
}