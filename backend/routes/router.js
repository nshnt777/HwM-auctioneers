import express from 'express'
import userRouter from './user.js'

const router = express.Router();

router.use('/user', userRouter);
// any call to /api/v1/user/..... will be forwarded to the user router

export default router;