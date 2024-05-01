// ./router/i18nRoute.js

const { Router } = require("express");
const i18nController = require("../Controllers/i18nController");

const router = Router();

// Route for English language
router.get("/en", i18nController.en);

// Route for Portuguese language
router.get("/pt", i18nController.pt);

// Route for Spanish language
router.get("/es", i18nController.es);

// Route for French language
router.get("/fr", i18nController.fr);

module.exports = router;