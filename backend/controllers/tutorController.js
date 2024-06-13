const { default: mongoose } = require('mongoose');
const Tutor = require('../models/tutorModel');
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

        res.status(200).json({tutorEmail, token})
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
            tutorDescription, 
            tutorPrice,
            tutorEmail
        } = req.body;

        const tutorProfile = await Tutor.updateOne({ "tutorEmail" : tutorEmail }, {
            tutorField, 
            tutorSubField, 
            profilePicture, 
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

        res.status(200).json({ tutorEmail: username, token, message: 'Login successful' });
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

const getTutorByEmail = async (req, res) => {
    try {
        const { tutorEmail }  = req.body;
        console.log(req.body)
        console.log(tutorEmail)
        const TutorData = await Tutor.findOne({ tutorEmail: tutorEmail }, {});
        // console.log(TutorData)

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

module.exports = {
    getAllTutor,
    createTutor,
    filterTutor,
    tutorValidation,
    insertTutorProfilePicture,
    createTutorProfile,
    getTutorByEmail,
    deleteTutorByEmail
}