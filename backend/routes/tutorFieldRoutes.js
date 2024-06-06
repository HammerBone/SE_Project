const express = require('express')
const {
    getAllTutorField,
    createTutorField
} = require('../controllers/tutorFieldController')

const router = express.Router()

router.get('/getAllTutorField', getAllTutorField)
router.post('/createTutorField', createTutorField)


module.exports = router