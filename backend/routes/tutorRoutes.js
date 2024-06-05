const express = require('express')
const {
    getAllTutor,
    createTutor,
    tutorValidation
} = require('../controllers/tutorController')

const router = express.Router()

router.get('/getAllTutor', getAllTutor)
router.post('/createTutor/', createTutor)
router.post('/tutorValidation/', tutorValidation)

module.exports = router