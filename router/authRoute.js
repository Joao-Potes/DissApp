const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Assuming you have a User model

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      }

      bcrypt.compare(password, user.password, function (err, res) {
        if (res) {
          // Passwords match
          return done(null, user);
        } else {
          // Passwords don't match
          return done(null, false, {
            message: "Incorrect username or password.",
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

router.get("/signup", function (req, res, next) {
  res.render("signup");
});

router.post("/signup", function (req, res, next) {
  bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
    if (err) {
      return next(err);
    }
    const user = new User({
      username: req.body.username,
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
