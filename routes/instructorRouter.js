import express from 'express';
import {GetAllInstructors,GetInstructorById,insertInstructor} from '../controller/instructorController.js';
const instructorRouter = express.Router();

instructorRouter.get('/instructor/all',GetAllInstructors);
instructorRouter.get('/instructor/:id',GetInstructorById);

//testing only
instructorRouter.post('/instructor/add',insertInstructor);


export default instructorRouter;

