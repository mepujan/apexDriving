import express from 'express';
import {Login , SignUp}from '../controller/authController.js';

const authRouter = express.Router();

authRouter.post('/api/login',Login);
authRouter.post('/api/signup',SignUp);


export default authRouter;