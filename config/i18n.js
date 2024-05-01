// ./config/i18n.js

const path = require("path");
const i18n = require("i18n");

// Configure i18n module
i18n.configure({
  locales: ["en", "pt", "es", "fr"], // Supported locales
  defaultLocale: "pt", // Default locale
  directory: path.join(__dirname, "locales"), // Directory where locale files are stored
  cookie: "i18n", // Name of the cookie used to store the selected locale
});

module.exports = i18n;
