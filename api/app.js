// everything starts from here
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;


app.use(bodyParser.json());


app.use('/api', require('./register'));
app.use('/api', require('./login'));
app.use('/api', require('./newtrain'));
app.use('/api', require('./bookseat'));
app.use('/api', require('./bookingdetails'));


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
