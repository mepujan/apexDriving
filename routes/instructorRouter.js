import express from 'express';
import {GetAllInstructors,GetInstructorById,insertInstructor,getInstructorAvailability,getInstructorWeeklyAvailability} from '../controller/instructorController.js';
const instructorRouter = express.Router();

instructorRouter.get('/instructor/all',GetAllInstructors);
instructorRouter.get('/instructor/:id',GetInstructorById);
instructorRouter.post('/instructor/availability',getInstructorWeeklyAvailability)

//testing only
instructorRouter.post('/instructor/add',insertInstructor);
instructorRouter.get('/instructor/:id/schedule',getInstructorAvailability);

export default instructorRouter;

