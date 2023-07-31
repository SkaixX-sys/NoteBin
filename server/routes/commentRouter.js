import commentController from "../controller/commentController.js";
import Router from "express";
const router = new Router();
import authMiddleware from "../middleware/auth-middleware.js";
//добавить валидацию express-validator

router.post("/", authMiddleware, commentController.create);
router.delete("/:id", authMiddleware, commentController.delete);
router.put("/:id", authMiddleware, commentController.put);
router.get(
  "/getAllByPasteId/:id",
  commentController.getAllByPasteId
);
router.get(
  "/getAllByUserId/:id",
  authMiddleware,
  commentController.getAllByUserId
);

export default router;
