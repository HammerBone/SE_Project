const express = require('express')
const {
    getAllTutor,
    createTutor,
    filterTutor
} = require('../controllers/tutorController')

const router = express.Router()

router.get('/getAllTutor', getAllTutor)
router.post('/createTutor', createTutor)
router.get('/filterTutor', filterTutor)


module.exports = router