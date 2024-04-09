const express = require("express");
const router = express.Router();
const compilerController = require("../Controllers/compilerController");

router.post("/compilecode", compilerController.compile);
module.exports = router;
