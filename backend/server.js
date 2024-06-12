require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const templateRoutes = require('./routes/template')
const tutorRoutes = require('./routes/tutorRoutes')
const tutorFieldRoutes = require('./routes/tutorFieldRoutes')

//express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/template', templateRoutes)
app.use('/api/tutor', tutorRoutes)
app.use('/api/tutorField', tutorFieldRoutes)
app.use('/api/tutor/getTutorProfilePic', express.static(__dirname + '/uploads'))

// db connection
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () =>  {
            console.log('listening on port', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error)
    })