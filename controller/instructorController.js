import instructor from '../model/Instructor.js';

export const GetAllInstructors = async(req,res,next)=>{
    try{
        const Instructors = await instructor.find({});
        return res.status(200).json(Instructors);
    }catch(error){
            next(error);
    }
}

export const GetInstructorById = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const Instructor = await instructor.findOne({_id:id});
        return res.status(200).json(Instructor);
    }catch(error){
            next(error);
    }
}

export const insertInstructor = async(req,res,next)=>{
    try{
        const Instructor = new instructor(req.body);
        await Instructor.save();
        return res.status(200).json(Instructor);
    }catch(error){
            next(error);
    }
}