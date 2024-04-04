import { Router } from "express";
import * as userController from "../Controllers/userController.js";
import { noAuthAPI, userAuthAPI } from "../middlewares/userMiddleware.js";

const router = Router();

router.post("/register", noAuthAPI, userController.createUser);
router.post("/login", noAuthAPI, userController.login);

export default router;
