// ./config/passport.js

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../Models/user");

// Load User model

module.exports = function (passport) {
  // Local Strategy for authenticating users
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email,
      }).then((user) => {
        if (!user) {
          return done(null, false, { message: "That email is not registered" });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        });
      });
    })
  );

  // Serialize user object to store in session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // Deserialize user object from session
  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
