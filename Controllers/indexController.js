//./Controllers/indexController.js
const i18n = require("../config/i18n.js");

// Importing the i18n module

// Handler for the home route
const home = (req, res) => {
  // Set the locale based on the value of the "i18n" cookie, if it exists
  if (req.cookies.i18n) i18n.setLocale(req.cookies.i18n);
  
  // Render the "index" view and pass the user object from the request
  return res.render("index", {
    user: req.user,
  });
};

// Handler for the login route
const login = (req, res) => {
  // Render the "login" view
  return res.render("login");
};

// Handler for the register route
const register = (req, res) => {
  // Render the "register" view
  return res.render("register");
};

// Handler for the about route
const about = (req, res) => {
  // Render the "about" view
  return res.render("about");
};

// Handler for the contact route
const contact = (req, res) => {
  // Render the "contact" view
  return res.render("contact");
};

// Handler for the ide route
const ide = (req, res) => {
  // Render the "ide" view
  return res.render("ide");
};

// Handler for the chat route
const chat = (req, res) => {
  // Render the "chat" view
  return res.render("chat");
};

// Handler for the feedback route
const feedback = (req, res) => {
  // Render the "feedback" view
  return res.render("feedback");
};

// Handler for the challenges route
const challenges = (req, res) => {
  // Render the "challenges" view
  return res.render("challenges");
};

// Handler for the navbar route
const navbar = (req, res) => {
  // Render the "navbar" view
  return res.render("navbar");
};

// Handler for the langchoice route
const langchoice = (req, res) => {
  // Render the "langchoice" view
  return res.render("langchoice");
};

// Handler for the policy route
const policy = (req, res) => {
  // Render the "policy" view
  return res.render("policy");
};

// Exporting the handlers as an object
module.exports = {
  home, // Handler for the home route
  login, // Handler for the login route
  register, // Handler for the register route
  about, // Handler for the about route
  contact, // Handler for the contact route
  ide, // Handler for the ide route
  chat, // Handler for the chat route
  feedback, // Handler for the feedback route
  challenges, // Handler for the challenges route
  navbar, // Handler for the navbar route
  langchoice, // Handler for the langchoice route
  policy, // Handler for the policy route
};
