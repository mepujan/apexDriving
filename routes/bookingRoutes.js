import express from 'express';
import {BookAppointment,deleteAppoinment,getAllAppointment} from '../controller/bookingController.js';
import { LoginRequired } from '../middleware/LoginRequired.js';
const bookingRouter = express.Router();

bookingRouter.post('/booking',LoginRequired,BookAppointment);

//testing only
bookingRouter.get('/booking/delete/:id',LoginRequired,deleteAppoinment);
bookingRouter.get('/booking/all',LoginRequired,getAllAppointment)

export default bookingRouter;

