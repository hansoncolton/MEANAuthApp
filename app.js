const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to DB
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected', () =>
{
  console.log('connected to db ' + config.database);
});

//On Error
mongoose.connection.on('error', (err) =>
{
  console.log('db error ' + err);
});

const app = express();

const users = require('./routes/users');

const port = 3000;

//CORS middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname,'public')));

//body barser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);

//index route
app.get('/', (req, res) => {
  res.send('Invalid endpoint');
})

//start server
app.listen(port,() => {
  console.log('Server started on port: ' + port);
});
