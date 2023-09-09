const express = require('express');

const app = express();

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));

const port = 3000;

// Route
app.get('/', (req, res) => {
  res.status(200).render('index', 
  {page_name: "index"});
});
app.get('/about', (req, res) => {
  res.status(200).render('about',
  {page_name: "about"});
});
// app.get('/about', (req, res) => {
//   res.status(200).render('about');
// });

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
