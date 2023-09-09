const express = require('express');
const CourseController = require('../controllers/courseController');

const router = express.Router();

router.route('/').post(CourseController.createCourse);
router.route('/').get(CourseController.getAllCourse);


module.exports = router;