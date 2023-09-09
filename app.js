const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/CourseRoute');
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

// Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = 3000;

app.use('/', pageRoute)
app.use('/courses', courseRoute)

app.listen(port, () => {
console.log(`App started on port ${port}`);
});
