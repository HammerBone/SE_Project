const { default: mongoose } = require('mongoose')
const Tutor = require('../models/tutorModel')
// const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
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

//validating tutor login
const tutorValidation = async (req,res) =>{
  const { username, password } = req.body;
  try {
    // Find the user by their username
    const user = await Tutor.findOne({ tutorEmail: username });
    if (user) {
      // Compare the provided password with the hashed password in the database
      const hash = await bcrypt.hash(user.tutorPassword,0)
      const isMatch = await bcrypt.compare(password, hash);
      console.log(user, isMatch, password)
      
      if (isMatch) {
        // Authentication successful
        res.json({ message: 'Login successful'});
        // res.redirect('/')
      } else {
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

module.exports = {
    getAllTutor,
    createTutor,
    tutorValidation
}