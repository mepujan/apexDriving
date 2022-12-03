import express from 'express';
import {GetAllUsers,GetUserById,GetBookingByStudentId} from '../controller/userController.js';
import { LoginRequired } from '../middleware/LoginRequired.js';
const userRouter = express.Router();

userRouter.get('/api/student/all',GetAllUsers);
userRouter.get('/api/student',LoginRequired,GetUserById);
userRouter.get('/api/student/booking',LoginRequired,GetBookingByStudentId);

export default userRouter;

