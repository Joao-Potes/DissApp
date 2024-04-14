const { Router } = require("express");
const i18nController = require("../Controllers/i18nController");
const router = Router();

router.get("/en", i18nController.en);
router.get("/pt", i18nController.pt);
router.get("/es", i18nController.es);
router.get("/fr", i18nController.fr);

module.exports = router;