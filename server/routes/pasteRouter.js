import pasteController from "../controller/pasteController.js";
import Router from "express";
const router = new Router();

//добавить валидацию express-validator

router.post("/", pasteController.create);
router.get("/", pasteController.getAll);
router.get("/pasteDetails", pasteController.getNameNameCreatorCategory);
router.get("/getPaste/:id", pasteController.getOne);
router.delete("/:id", pasteController.delete);
router.put("/:id", pasteController.update);
router.get("/userPastes/", pasteController.getAllByUserId);

export default router;

