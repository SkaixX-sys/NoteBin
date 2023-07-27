import pasteController from "../controller/pasteController.js";
import Router from "express";
const router = new Router();

//добавить валидацию express-validator

router.post("/", pasteController.create);
router.get("/", pasteController.getAll);
router.get("/pasteDetails", pasteController.getNameNameCreatorCategory);
router.get("/:id", pasteController.getOne);
router.put("/:id", pasteController.update);
router.delete("/:id", pasteController.delete);

export default router;
