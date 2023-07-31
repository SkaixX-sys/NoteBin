import Router from "express";
import viewController from "../controller/viewController.js";
const router = new Router();

//добавить валидацию express-validator

router.post("/create", viewController.create);

export default router;
