const bcrypt = require("bcrypt");
const User = require("../models/User");
const passport = require("passport");


exports.loginPost = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
});

exports.logoutPost = function (req, res, next) {
  req.logout();
  res.redirect("/");
};


exports.registerPost = function (req, res, next) {
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
};