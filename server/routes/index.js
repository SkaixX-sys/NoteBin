import Router from 'express';
const router = new Router;
import pasteRouter from './pasteRouter.js';
import userRouter from './userRouter.js'

router.use('/paste', pasteRouter)
router.use('/user', userRouter)


export default router