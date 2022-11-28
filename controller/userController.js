import user from '../model/User.js';
import scheduled from '../model/Schedule.js'

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
        const id = req.userId;
        const User = await user.findOne({_id:id});
        return res.status(200).json(User);
    }catch(error){
            next(error);
    }
}

export const GetBookingByStudentId = async(req,res,next)=>{
    try{
        const id = req.userId;
        const Booking = await scheduled.find({user:id});
        return res.status(200).json(Booking);
    }catch(error){
            next(error);
    }
}
