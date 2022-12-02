import user from '../model/User.js';
import scheduled from '../model/Schedule.js'
import Instructor from '../model/Instructor.js';

export const GetAllUsers = async(req,res,next)=>{
    try{
        const Users = await user.find({});
        return res.status(200).json(Users);
    }catch(error){
            next(error);
    }
}

export const GetUserById = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const User = await user.findOne({_id:id});
        return res.status(200).json(User);
    }catch(error){
            next(error);
    }
}

export const GetBookingByStudentId = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const Booking = await scheduled.find({user:id});
        const instructors = await Instructor.find({});
        const MappedBooking = Booking.map(b=>{
            return {
                booked_schedule:b.booked_schedule,
                _id:b._id,
                user:b.user,
                instructor:instructors.find(i => i.id == b.instructor)
            };
        })
        return res.status(200).json(MappedBooking);
    }catch(error){
            next(error);
    }
}
