import express from 'express';
import {BookAppointment,deleteAppoinment,getAllAppointment} from '../controller/bookingController.js';
const bookingRouter = express.Router();

bookingRouter.post('/booking',BookAppointment);

//testing only
bookingRouter.get('/booking/delete/:id',deleteAppoinment);
bookingRouter.get('/booking/all',getAllAppointment)

export default bookingRouter;

