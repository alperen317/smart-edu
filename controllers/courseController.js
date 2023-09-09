const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: 'success',
      course,
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
};

exports.getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).render('courses', {
        courses,
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
