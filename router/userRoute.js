const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
// Load User model
const User = require("../Models/user");
const UserController = require("../Controllers/userController");
const { forwardAuthenticated } = require("../config/auth");

// Register
router.post("/register", forwardAuthenticated, UserController.createUser);


// Login
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

// Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error during logout." });
    }
    res.redirect("/login");
  });
});

module.exports = router;
