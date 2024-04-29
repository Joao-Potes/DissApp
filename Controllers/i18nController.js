// Set the language to English
const en = (req, res) => {
  res.cookie("i18n", "en"); // Set a cookie with the language code "en"
  res.redirect("/"); // Redirect to the home page
};

// Set the language to Portuguese
const pt = (req, res) => {
  res.cookie("i18n", "pt"); // Set a cookie with the language code "pt"
  res.redirect("/"); // Redirect to the home page
};

// Set the language to Spanish
const es = (req, res) => {
  res.cookie("i18n", "es"); // Set a cookie with the language code "es"
  res.redirect("/"); // Redirect to the home page
};

// Set the language to French
const fr = (req, res) => {
  res.cookie("i18n", "fr"); // Set a cookie with the language code "fr"
  res.redirect("/"); // Redirect to the home page
};

// Export the language functions
module.exports = { en, pt, es, fr };