const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const User = require("../models/User"); // Assuming you have a User model

passport.use(
  new LocalStrategy(function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: "Incorrect email or password.",
        });
      }

      bcrypt.compare(password, user.password, function (err, res) {
        if (res) {
          // Passwords match
          return done(null, user);
        } else {
          // Passwords don't match
          return done(null, false, {
            message: "Incorrect email or password.",
          });
        }
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

const router = express.Router();

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.post("/logout", function (req, res, next) {
  req.logout();
  res.redirect("/");
});

router.get("/register", function (req, res, next) {
  res.render("register");
});

router.post("/register", function (req, res, next) {
  bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
    if (err) {
      return next(err);
    }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    user.save(function (err) {
      if (err) {
        return next(err);
      }
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect("/");
      });
    });
  });
});

module.exports = router;
