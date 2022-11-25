import express from 'express';
import {GetAllUsers,GetUserById,GetBookingByStudentId} from '../controller/userController.js';
const userRouter = express.Router();

userRouter.get('/student/all',GetAllUsers);
userRouter.get('/student/:id',GetUserById);
userRouter.get('/student/:id/booking',GetBookingByStudentId);

export default userRouter;

