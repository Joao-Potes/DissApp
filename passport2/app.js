const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Passport Config
require('./config/passport')(passport);


// Connect to MongoDB
mongoose
  .connect
   ("mongodb://localhost:27017/dissertation")
// EJS
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());


// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
