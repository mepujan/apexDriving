import Schedule from '../model/Schedule.js';
import scheduled from '../model/Schedule.js';
import { sendmail } from '../Sendmail/sendemail.js';
import User from '../model/User.js'


export const BookAppointment = async(req,res,next)=>{
    try{
       const {instructor, booked_scheduled } = req.body;
       const start_time = new Date(Date.parse(booked_scheduled.start_time));
       const end_time = new Date(start_time.getTime() + 60 * 60 * 1000);
       const new_booking = new Schedule({
        user: req.userId,
        instructor: instructor,
        booked_schedule:{
            start_time:start_time,
            end_time: end_time
        }
       });
       const result = await new_booking.save();
       const user = await User.find({_id : req.userId})
       sendmail(user[0].email,user[0].user_name,start_time)
       return res.status(200).json(result);
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
