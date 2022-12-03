import express from 'express';
import {BookAppointment,deleteAppoinment,getAllAppointment} from '../controller/bookingController.js';
import { LoginRequired } from '../middleware/LoginRequired.js';
const bookingRouter = express.Router();

bookingRouter.post('/api/booking',LoginRequired,BookAppointment);

//testing only
bookingRouter.get('/api/booking/delete/:id',LoginRequired,deleteAppoinment);
bookingRouter.get('/api/booking/all',LoginRequired,getAllAppointment)

export default bookingRouter;

