const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/CourseRoute');
const categoryRoute = require('./routes/categoryRoute')
const userRoute = require('./routes/userRoute');
const app = express();


// // Connect db

mongoose.connect('mongodb://127.0.0.1:27017/smartedu-db',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('db connected');
});
// mongoose.connect('mongodb://localhost/smartedu-db', {
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
//  useFindAndModify: false,
//  useCreateIndex: true
// }).then(() => {
//     console.log('DB connected')
// })

// Template Engine
app.set('view engine', 'ejs');


global.userIN = null;
// Middlewares

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


const port = 3000;

app.use(session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/smartedu-db' })
}))

app.use('*', (req,res, next) => {
    userIN = req.session.userID;
    next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/category', categoryRoute);
app.use('/users', userRoute);

app.listen(port, () => {
console.log(`App started on port ${port}`);
});
