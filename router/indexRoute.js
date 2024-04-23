const Router = require("express").Router;
const router = Router();
const indexController = require("../Controllers/indexController");
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../config/auth");

router.get("/",ensureAuthenticated ,indexController.home);
router.get("/login",forwardAuthenticated, indexController.login);
router.get("/register",forwardAuthenticated, indexController.register);
router.get("/about",ensureAuthenticated, indexController.about);
router.get("/contact", ensureAuthenticated, indexController.contact);
router.get("/ide", ensureAuthenticated, indexController.ide);
router.get("/chat", ensureAuthenticated, indexController.chat);
router.get("/feedback", ensureAuthenticated, indexController.feedback);
router.get("/challenges", ensureAuthenticated, indexController.challenges);
router.get("/langchoice", ensureAuthenticated, indexController.langchoice);
router.get("/policy",forwardAuthenticated, indexController.policy);

module.exports = router;
