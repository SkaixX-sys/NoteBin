import Router from "express";
const router = new Router();
import pasteRouter from "./pasteRouter.js";
import userRouter from "./userRouter.js";
import commentRouter from "./commentRouter.js";
import viewsRouter from "./viewsRouter.js";
import categoryRoouter from "./categoryRouter.js";

router.use("/paste", pasteRouter);
router.use("/user", userRouter);
router.use("/comments", commentRouter);
router.use("/view", viewsRouter);
router.use("/category", categoryRoouter);

export default router;
