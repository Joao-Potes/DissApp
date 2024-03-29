const home = (req, res) => {
  return res.render("index");
};
const register = (req, res) => {
  return res.render("register");
};
const login = (req, res) => {
  return res.render("login");
};
const about = (req, res) => {
  return res.render("about");
};
const contact = (req, res) => {
  return res.render("contact");
};
const policy = (req, res) => {
  return res.render("policy");
};
const feedback = (req, res) => {
  return res.render("feedback");
};

export { home, register, login, about, contact, policy, feedback };