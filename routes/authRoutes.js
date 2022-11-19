import express from 'express';
import {Login , SignUp}from '../controller/authController.js';

const authRouter = express.Router();

authRouter.post('/login',Login);
authRouter.post('/signup',SignUp);


export default authRouter;