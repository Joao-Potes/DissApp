const Router = require('express').Router;
const indexController = require('../Controllers/indexController');
const router = Router();

router.get('/', indexController.home);
router.get('/login', indexController.login);
router.get('/register', indexController.register);
router.get('/about', indexController.about);
router.get('/contact', indexController.contact);
router.get('/ide', indexController.ide);
router.get('/chat', indexController.chat);
router.get('/feedback', indexController.feedback);
router.get('/challenges', indexController.challenges);
router.get('/langchoice', indexController.langchoice);
router.get('/policy', indexController.policy);

module.exports = router;

