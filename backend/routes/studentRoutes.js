const express = require('express');

const {
    createStudent
} = require('../controllers/studentController');

const router = express.Router();

router.post('/createStudent', createStudent);

module.exports = router;