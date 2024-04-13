 const en = (req, res) => {
  res.cookie("i18n", "en");
  res.redirect("/");
};
 const pt = (req, res) => {
  res.cookie("i18n", "pt");
  res.redirect("/");
};
 const es = (req, res) => {
  res.cookie("i18n", "es");
  res.redirect("/");
};
 const fr = (req, res) => {
  res.cookie("i18n", "fr");
  res.redirect("/");
};


module.exports = { en, pt, es, fr };