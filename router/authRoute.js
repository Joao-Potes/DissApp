const express = require("express");
const userController = require("../Controllers/authController");

const router = express.Router();


router.post("/login", userController.loginPost);

router.post("/logout", userController.logoutPost);


router.post("/register", userController.registerPost);

module.exports = router;