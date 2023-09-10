const express = require('express');
const CourseController = require('../controllers/courseController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

router.route('/').post(roleMiddleware(['teacher', 'admin']) ,CourseController.createCourse);
router.route('/').get(CourseController.getAllCourse);
router.route('/:slug').get(CourseController.getCourse);


module.exports = router;