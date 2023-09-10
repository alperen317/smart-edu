const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          req.session.userID = user._id;
          res.status(200).redirect('/users/dashboard');
        } else {
          res.status(200).send('YOU ARE NOT LOGGED IN');
        }
      });
    } else {
      res.redirect('/');
    }
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = (req, res ) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
}

exports.getDashboardPage = async (req,res) => {
  const user = await User.findOne({_id: req.session.userID});
  const categories = await Category.find();
  const courses = await Course.find({user:req.session.userID})
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user: user,
    categories: categories,
    courses:  courses
  })
}

// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     //mongoose 6
//     const user = await User.findOne({email: email });
//     if (user) {
//       bcrypt.compare(password, user.password, (err, same) => {
//         if (same) {
//           // USER SESSION
//           req.session.userID = user._id;
//           res.status(200).redirect('/users/dashboard');
//         } else {
//           req.flash('error', 'Your password is not correct!');
//           res.status(400).redirect('/login');
//         }
//       });
//     } else {
//       req.flash('error', 'User is not exist!');
//       res.status(400).redirect('/login');
//     }
//   } catch (error) {
//     res.status(400).json({
//       status: 'fail',
//       error,
//     });
//   }
// };
