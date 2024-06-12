const express = require('express');
const multer = require('multer');

const {
    getAllTutor,
    createTutor,
    filterTutor,
    tutorValidation,
    insertTutorProfilePicture,
    createTutorProfile,
    getTutorByEmail
} = require('../controllers/tutorController');

const router = express.Router();

const uploadPhotoMiddleware = multer({ dest: 'uploads' });

router.get('/getAllTutor', getAllTutor);
router.post('/createTutor', createTutor);
router.get('/filterTutor', filterTutor);
router.post('/tutorValidation/', tutorValidation);

router.get('/getTutorProfilePic', express.static(__dirname + '/uploads'));
router.post('/upload', uploadPhotoMiddleware.single('profilePic'), insertTutorProfilePicture);

router.post('/createTutorProfile', createTutorProfile);
router.post('/getTutorByEmail', getTutorByEmail);


module.exports = router;