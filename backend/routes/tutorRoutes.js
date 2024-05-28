const express = require('express')
const {
    getAllTutor,
    createTutor
} = require('../controllers/tutorController')

const router = express.Router()

router.get('/getAllTutor', getAllTutor)
router.post('/createTutor/', createTutor)

module.exports = router