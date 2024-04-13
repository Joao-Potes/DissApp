const path = require("path");
const i18n = require("i18n");



i18n.configure({
  locales: ["en", "pt", "es", "fr"],
  defaultLocale: "en",
  directory: path.join(__dirname, "locales"),
  cookie: "i18n",
});

module.exports= i18n;
