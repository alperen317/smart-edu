const express = require('express');
const pageController = require('../controllers/pageController');
const redirectMiddleware = require('../middlewares/redirectMiddleware');
const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
// router.route('/contact').get(pageController.getContactPage);
// router.route('/courses').get(pageController.getCoursesPage);
// router.route('/course').get(pageController.getCoursePage);
// router.route('/dashboard').get(pageController.getDashboardPage);
router.route('/login').get(redirectMiddleware, pageController.getLoginPage);
router.route('/register').get(redirectMiddleware, pageController.getRegisterPage);


module.exports = router;