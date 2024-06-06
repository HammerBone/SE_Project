const express = require('express')
const {
    getAllTutor,
    createTutor,
    filterTutor,
    tutorValidation
} = require('../controllers/tutorController')

const router = express.Router()

router.get('/getAllTutor', getAllTutor)
router.post('/createTutor', createTutor)
router.get('/filterTutor', filterTutor)

router.post('/tutorValidation/', tutorValidation)

module.exports = router