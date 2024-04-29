const http = require("http"); // Import the HTTP module
const socketIo = require("socket.io"); // Import the Socket.IO module
const express = require("express"); // Import the Express module
const mongoose = require("mongoose"); // Import the Mongoose module
const passport = require("passport"); // Import the Passport module
const LocalStrategy = require("passport-local").Strategy; // Import the LocalStrategy from Passport
const User = require("./Models/user"); // Import the User model
const userRoute = require("./router/userRoute.js"); // Import the userRoute module
const compilerRoute = require("./router/compilerRoute.js"); // Import the compilerRoute module
const indexRoute = require("./router/indexRoute.js"); // Import the indexRoute module
const i18nRoute = require("./router/i18nRoute.js"); // Import the i18nRoute module
const cookieParser = require("cookie-parser"); // Import the cookie-parser module
const session = require("express-session"); // Import the express-session module
const i18n = require("./config/i18n.js"); // Import the i18n module
const flash = require("connect-flash"); // Import the connect-flash module
const chatController = require("./Controllers/chatServerController"); // Import the chatServerController module

const app = express(); // Create an instance of the Express application
const port = 8000; // Set the port number

app.use(cookieParser()); // Use the cookie-parser middleware

app.use(i18n.init); // Initialize the i18n module

app.use((req, res, next) => {
  if (req.cookies.i18n) {
    i18n.setLocale(req.cookies.i18n); // Set the locale based on the cookie value
  }
  res.locals.i18n = i18n; // Make the i18n module available in the views
  next();
});

require("./config/passport")(passport); // Configure Passport

mongoose.connect("mongodb://localhost:27017/dissertation"); // Connect to the MongoDB database

app.set("view engine", "ejs"); // Set the view engine to EJS
app.use("/public", express.static(__dirname + "/public")); // Serve static files from the "public" directory
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(
  session({
    secret: "secret", // Set the session secret
    resave: true,
    saveUninitialized: true,
  })
);

// Passport configuration
app.use(passport.initialize()); // Initialize Passport
app.use(passport.session()); // Use Passport session

app.use(flash()); // Use the connect-flash middleware

app.use(indexRoute); // Use the indexRoute middleware
app.use("/users", userRoute); // Use the userRoute middleware for "/users" path
app.use("/lang", i18nRoute); // Use the i18nRoute middleware for "/lang" path
app.use(compilerRoute); // Use the compilerRoute middleware

// Create an HTTP server out of the Express app
const server = http.createServer(app);

// Create a Socket.IO server attached to the HTTP server
const io = socketIo(server);

chatController(io); // Use the chatServerController

server.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`) // Start the server and log the listening URL
);
