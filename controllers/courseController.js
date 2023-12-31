const Course = require('../models/Course');
const Category = require('../models/Category');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.name,
      category: req.body.category,
      user: req.session.userID
    });

    res.status(201).redirect('/courses');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getAllCourse = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    console.log(categorySlug);
    const category = await Category.findOne({slug: categorySlug});
    // const category = await Category.findOne(categorySlug);
  
    let filter = {};
    if(categorySlug){
      filter = {category: category._id}
    }

    const courses = await Course.find(filter).sort('-createdAt');

    const categories = await Category.find();
    res.status(200).render('courses', {
        courses,
        categories,
        page_name: 'courses'
    })
    // .json({
    //   status: 'success',
    //   courses,
    // });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({slug: req.params.slug}).populate('user');
    res.status(200).render('course', {
        course,
        page_name: 'course'
    })
    // .json({
    //   status: 'success',
    //   courses,
    // });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
};
