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
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
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
