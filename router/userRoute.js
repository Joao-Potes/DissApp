// ./router/userRoute.js

const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../Models/user");
const UserController = require("../Controllers/userController");
const { forwardAuthenticated } = require("../config/auth");

const router = express.Router();
// Load User model

// Register route
router.post("/register", forwardAuthenticated, UserController.createUser);

// Login route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // If authentication failed, `info` will contain a message.
      return res.render('login', { errors: [{ msg: info.message }] });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error during logout." });
    }
    res.redirect("/login");
  });
});

module.exports = router;
