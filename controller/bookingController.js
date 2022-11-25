import instructor from '../model/Instructor.js';
import user from '../model/User.js';
import scheduled from '../model/Scheduled.js';
import mongoose from "mongoose";


export const BookAppointment = async(req,res,next)=>{
    try{
        const userId = req.body.user_id;
        const instructorId = req.body.instructor_id;
        const startTime = new Date(req.body.starting_time);
        if(userId && instructorId && startTime){
            const Instructor = await instructor.find({_id: instructorId});
            const User = await instructor.find({_id: userId});
            if(Instructor && User){
                const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
                console.log(startTime);
                console.log(endTime);
                const Scheduled = new scheduled({
                    user: userId,
                    instructor: instructorId,
                    booked_schedule:{
                        start_time:startTime.toISOString(),
                        end_time:endTime.toISOString()
                    }
                })

                console.log(Scheduled);
                const result = await Scheduled.save();
                return res.status(200).json({result:result})
            }else{
                return res.status(200).json({result:"unknown error"});
            }
        }else{
            return res.status(200).json({result:"unknown error"});
        }
        
    }catch(error){
        console.log(error)
            next(error);
    }
}

export const getAllAppointment = async(req,res,next)=>{
    try{
        const result = await scheduled.find({})
        return res.status(200).json({result:result});
    }catch(error){
        console.log(error)
            next(error);
    }
}

export const deleteAppoinment = async(req,res,next)=>{
    try{
        const bookingId = req.params.id;
        const result = await scheduled.deleteOne({_id:bookingId})
        return res.status(200).json({result:result});
    }catch(error){
        console.log(error)
            next(error);
    }
}
