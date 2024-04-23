const User = require("./Model/user"); // Assuming you have a User model

 const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  return user;
};

 const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

module.exports = { getUserByEmail, getUserById };