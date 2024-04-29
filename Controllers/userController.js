const User = require("../Models/user");
const bcrypt = require("bcrypt");

// Function to create a new user
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
      // Render the registration page with error messages and form data
      res.render("register", {
        errors,
        name,
        email,
        password,
        password2,
      });
    } else {
      // Check if the user already exists
      User.findOne({ email: email }).then((user) => {
        if (user) {
          errors.push({ msg: "Email already exists" });
          // Render the registration page with error messages and form data
          res.render("register", {
            errors,
            name,
            email,
            password,
            password2,
          });
        } else {
          // Create a new user object
          const newUser = new User({
            name,
            email,
            password,
          });

          // Generate a salt and hash the password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              // Save the new user to the database
              newUser
                .save()
                .then((user) => {
                  req.flash(
                    "success_msg",
                    "You are now registered and can log in"
                  );
                  // Redirect to the login page
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

// Function to update user details
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
      // Render the update page with error messages and form data
      res.render("update", {
        errors,
        name,
        email,
        password,
      });
    } else {
      // Find the user by email
      User.findOne({ email: email }).then((user) => {
        if (!user) {
          errors.push({ msg: "User not found" });
          // Render the update page with error messages and form data
          res.render("update", {
            errors,
            name,
            email,
            password,
          });
        } else {
          // Update user details
          user.name = name;
          user.password = password;

          // Generate a salt and hash the new password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              // Save the updated user details to the database
              user
                .save()
                .then((user) => {
                  req.flash("success_msg", "User details updated successfully");
                  // Redirect to the profile page
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

// Function to delete a user
const deleteUser = async (req, res) => {
  try {
    // Find and delete the user by email
    User.findOneAndDelete({ email: req.body.email }).then((user) => {
      if (!user) {
        req.flash("error_msg", "User not found");
        // Redirect to the delete page
        res.redirect("/delete");
      } else {
        req.flash("success_msg", "User deleted successfully");
        // Redirect to the login page
        res.redirect("/login");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createUser };
