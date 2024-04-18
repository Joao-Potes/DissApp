const i18n = require("../i18n.js");

const home = (req, res) => {
    if (req.cookies.i18n) i18n.setLocale(req.cookies.i18n);
    return res.render("index", { i18n: res });
  
};

const login = (req, res) => {
    return res.render("login", { i18n: res });
};

const register = (req, res) => {
    return res.render("register", { i18n: res });
};

const about = (req, res) => {
    return res.render("about", { i18n: res });
}; 

const contact = (req, res) => {     
    return res.render("contact", { i18n: res });
};

const ide = (req, res) => {
    return res.render("ide", { i18n: res });
};

const chat = (req, res) => {
    return res.render("chat", { i18n: res });
};  

const feedback = (req, res) => {
    return res.render("feedback", { i18n: res });
};

const challenges = (req, res) => {
    return res.render("challenges", { i18n: res });
};

const navbar = (req, res) => {  
    return res.render("navbar", { i18n: res });
};

const langchoice = (req, res) => {
    return res.render("langchoice", { i18n: res });
};

const policy = (req, res) => {
    return res.render("policy", { i18n: res });
};

module.exports = { home, login, register, about, contact, ide, chat, feedback, challenges, navbar, langchoice, policy };