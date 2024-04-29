const express = require("express");
const compilerController = require("../Controllers/compilerController");

const router = express.Router();

// Route for compiling code
router.post("/compilecode", compilerController.compile);

module.exports = router;
