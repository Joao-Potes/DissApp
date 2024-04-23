const User = require("../Models/user");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  try {
    if (!name || !email || !password || !password2) {
      errors.push({ msg: "Please enter all fields" });
    }

    if (password != password2) {
      errors.push({ msg: "Passwords do not match" });
    }

    if (password.length < 6) {
      errors.push({ msg: "Password must be at least 6 characters" });
    }

    if (errors.length > 0) {
      res.render("register", {
        errors,
        name,
        email,
        password,
        password2,
      });
    } else {
      User.findOne({ email: email }).then((user) => {
        if (user) {
          errors.push({ msg: "Email already exists" });
          res.render("register", {
            errors,
            name,
            email,
            password,
            password2,
          });
        } else {
          const newUser = new User({
            name,
            email,
            password,
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  req.flash(
                    "success_msg",
                    "You are now registered and can log in"
                  );
                  res.redirect("/login");
                })
                .catch((err) => console.log(err));
            });
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  let errors = [];
  try {
    if (!name || !email || !password) {
      errors.push({ msg: "Please enter all fields" });
    }

    if (password.length < 6) {
      errors.push({ msg: "Password must be at least 6 characters" });
    }

    if (errors.length > 0) {
      res.render("update", {
        errors,
        name,
        email,
        password,
      });
    } else {
      User.findOne({ email: email }).then((user) => {
        if (!user) {
          errors.push({ msg: "User not found" });
          res.render("update", {
            errors,
            name,
            email,
            password,
          });
        } else {
          user.name = name;
          user.password = password;

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              user
                .save()
                .then((user) => {
                  req.flash("success_msg", "User details updated successfully");
                  res.redirect("/profile");
                })
                .catch((err) => console.log(err));
            });
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    User.findOneAndDelete({ email: req.body.email }).then((user) => {
      if (!user) {
        req.flash("error_msg", "User not found");
        res.redirect("/delete");
      } else {
        req.flash("success_msg", "User deleted successfully");
        res.redirect("/login");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createUser };
