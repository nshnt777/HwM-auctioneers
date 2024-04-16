import express from 'express'
import userRouter from './user.js'
import auctionRouter from './auction.js';

const router = express.Router();

router.use('/user', userRouter);
// any call to /api/v1/user/..... will be forwarded to the user router

// router.use('/auction', auctionRouter);
// any call to /api/v1/auction/..... will be forwarded to the user router

export default router;