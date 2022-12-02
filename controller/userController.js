import user from '../model/User.js';
import Schedule from '../model/Schedule.js'
import mongoose from 'mongoose';

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
        const Booking = await Schedule.aggregate([
            {$match:{user: mongoose.Types.ObjectId(id)}},
            {
                $lookup:{
                    from : 'instructors',
                    localField : 'instructor',
                    foreignField: '_id',
                    as:'instructor',
                    pipeline :[{
                        $project:{
                            "_id":0,
                            "__v":0
                        }
                    }
                    ]
                }
            },
            {
                $unwind: "$instructor"
            },{
                $project:{
                "__v":0,
                "user":0
                }
            }
        ]);
        return res.status(200).json(Booking);
    }catch(error){
            next(error);
    }
}
