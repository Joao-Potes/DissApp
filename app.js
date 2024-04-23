const http = require("http");
const socketIo = require("socket.io");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./Models/user"); // Assuming you have a User model
const app = express();
const port = 8000;
const userRoute = require("./router/userRoute.js");
const compilerRoute = require("./router/compilerRoute.js");
const indexRoute = require("./router/indexRoute.js");
const i18nRoute = require("./router/i18nRoute.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const i18n = require("./config/i18n.js");
const flash = require("connect-flash");

app.use(cookieParser());

app.use(i18n.init);

app.use((req, res, next) => {
  if (req.cookies.i18n) {
    i18n.setLocale(req.cookies.i18n);
  }
  res.locals.i18n = i18n;
  next();
});

require("./config/passport")(passport);

mongoose.connect("mongodb://localhost:27017/dissertation");

app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(indexRoute);
app.use("/users", userRoute);
app.use("/lang", i18nRoute);
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
