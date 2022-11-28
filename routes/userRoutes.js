import express from 'express';
import {GetAllUsers,GetUserById,GetBookingByStudentId} from '../controller/userController.js';
import { LoginRequired } from '../middleware/LoginRequired.js';
const userRouter = express.Router();

userRouter.get('/student/all',GetAllUsers);
userRouter.get('/student',LoginRequired,GetUserById);
userRouter.get('/student/booking',LoginRequired,GetBookingByStudentId);

export default userRouter;

