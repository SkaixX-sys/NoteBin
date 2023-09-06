import Router from "express";
import categoryController from "../controller/categoryController.js";
const router = new Router();

router.post("/", categoryController.create);
router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getOne);

export default router;
