import userController from "../controller/userController.js";
import Router from "express";
import authMiddleware from "../middleware/auth-middleware.js";
const router = new Router();

//добавить валидацию express-validator

router.post("/login", userController.login);
router.post("/registration", userController.registration);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);

export default router;
