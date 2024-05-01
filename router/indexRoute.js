// ./router/indexRoute.js
const Router = require("express").Router;
const indexController = require("../Controllers/indexController");

const router = Router();
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../config/auth");

// Home page
router.get("/", ensureAuthenticated, indexController.home);

// Login page
router.get("/login", forwardAuthenticated, indexController.login);

// Register page
router.get("/register", forwardAuthenticated, indexController.register);

// About page
router.get("/about", ensureAuthenticated, indexController.about);

// Contact page
router.get("/contact", ensureAuthenticated, indexController.contact);

// IDE page
router.get("/ide", ensureAuthenticated, indexController.ide);

// Chat page
router.get("/chat", ensureAuthenticated, indexController.chat);

// Feedback page
router.get("/feedback", ensureAuthenticated, indexController.feedback);

// Challenges page
router.get("/challenges", ensureAuthenticated, indexController.challenges);

// Language choice page
router.get("/langchoice", ensureAuthenticated, indexController.langchoice);

// Policy page
router.get("/policy", indexController.policy);

module.exports = router;
