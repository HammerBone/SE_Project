const express = require('express');

const {
    createStudent,
    getAllStudent,
    getStudentByEmail,
    studentValidation,
    bookTutor,
    getBoookedTutor
} = require('../controllers/studentController');

const router = express.Router();

router.post('/createStudent', createStudent);
router.get('/getAllStudent', getAllStudent);
router.post('/getStudentByEmail', getStudentByEmail);
router.post('/studentValidation', studentValidation);
router.post('/bookTutor', bookTutor);
router.post('/getBoookedTutor', getBoookedTutor)

module.exports = router;