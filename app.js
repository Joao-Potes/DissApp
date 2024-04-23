const http = require("http");
const socketIo = require("socket.io");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User"); // Assuming you have a User model
const app = express();
const port = 8000;
const authRoute = require("./router/authRoute.js");
const userRoute = require("./router/userRoute.js");
const compilerRoute = require("./router/compilerRoute.js");
const indexRoute = require("./router/indexRoute.js");
const i18nRoute = require("./router/i18nRoute.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const i18n = require("./i18n.js");

app.use(cookieParser());

app.use(i18n.init);

mongoose.connect("mongodb://localhost:27017/dissertation");

app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(authRoute);
app.use(indexRoute);
app.use("/lang",i18nRoute);
app.use(compilerRoute);

// Create an HTTP server out of the Express app
const server = http.createServer(app);

// Create a Socket.IO server attached to the HTTP server
const io = socketIo(server);

const chatController = require("./Controllers/chatServerController");
// Use the chat controller
chatController(io);

server.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);