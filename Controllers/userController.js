// controllers/userController.js
const User = require('../Models/user');

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
    }
};
