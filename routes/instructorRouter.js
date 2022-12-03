import express from 'express';
import {GetAllInstructors,GetInstructorById,insertInstructor,getInstructorAvailability,getInstructorWeeklyAvailability} from '../controller/instructorController.js';
const instructorRouter = express.Router();

instructorRouter.get('/api/instructor/all',GetAllInstructors);
instructorRouter.get('/api/instructor/:id',GetInstructorById);
instructorRouter.post('/api/instructor/availability',getInstructorWeeklyAvailability)

//testing only
instructorRouter.post('/api/instructor/add',insertInstructor);
instructorRouter.get('/api/instructor/:id/schedule',getInstructorAvailability);

export default instructorRouter;

