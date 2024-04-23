const i18n = require("../config/i18n.js");

const home = (req, res) => {
  if (req.cookies.i18n) i18n.setLocale(req.cookies.i18n);
  return res.render("index", {
    user: req.user,
  });
};

const login = (req, res) => {
  return res.render("login");
};

const register = (req, res) => {
  return res.render("register");
};

const about = (req, res) => {
  return res.render("about");
};

const contact = (req, res) => {
  return res.render("contact");
};

const ide = (req, res) => {
  return res.render("ide");
};

const chat = (req, res) => {
  return res.render("chat");
};

const feedback = (req, res) => {
  return res.render("feedback");
};

const challenges = (req, res) => {
  return res.render("challenges");
};

const navbar = (req, res) => {
  return res.render("navbar");
};

const langchoice = (req, res) => {
  return res.render("langchoice");
};

const policy = (req, res) => {
  return res.render("policy");
};

module.exports = {
  home,
  login,
  register,
  about,
  contact,
  ide,
  chat,
  feedback,
  challenges,
  navbar,
  langchoice,
  policy,
};
