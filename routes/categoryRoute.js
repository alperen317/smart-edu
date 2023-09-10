const express = require('express');
const CategoryController = require('../controllers/categoryController');

const router = express.Router();

router.route('/').post(CategoryController.createCategory);


module.exports = router;