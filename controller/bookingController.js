import Schedule from '../model/Schedule.js';
import scheduled from '../model/Schedule.js';
import { sendmail } from '../Sendmail/sendemail.js';
import User from '../model/User.js'


export const BookAppointment = async(req,res,next)=>{
    try{
        // time should be in format hr:min:sec
        const weekDays = {
            "sunday":0,
            "monday":1,
            "tuesday":2,
            "wednesday":3,
            "thursday":4,
            "friday":5,
            "saturday":6
        }
        let {instructor,day, time } = req.body;
        const [hr,min,sec] = time.split(":");
        const today = new Date();
        day = day.toLowerCase();
        const bookingDate = new Date(today.setDate(today.getDate() - today.getDay() + weekDays[day]));
        bookingDate.setHours(hr);
        bookingDate.setMinutes(min);
        bookingDate.setSeconds(sec);
       const end_time = new Date(bookingDate.getTime() + 60 * 60 * 1000);
       const new_booking = new Schedule({
        user: req.userId,
        instructor: instructor,
        booked_schedule:{
            start_time:bookingDate,
            end_time: end_time
        }
       });
       const result = await new_booking.save();
       const user = await User.find({_id : req.userId});
       sendmail(user[0].email,user[0].user_name,bookingDate);
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
