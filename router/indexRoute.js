import { Router } from "express";
import indexController from "../Controllers/indexController.js";
console.log(indexController);
import { noAuthPage, userAuthPage } from "../middlewares/userMiddleware.js";
const router = Router();

router.get("/", userAuthPage, indexController.home);
router.get("/about", userAuthPage, indexController.about);
router.get("/contact", userAuthPage, indexController.contact);
router.get("/policy", noAuthPage, indexController.policy);
router.get("/feedback", userAuthPage, indexController.feedback);
router.get("/register", noAuthPage, indexController.register);
router.get("/login", noAuthPage, indexController.login);

module.exports = router;
