import instructor from '../model/Instructor.js';
import Availability from '../model/Availability.js';
import Schedule from '../model/Schedule.js';
import {startOfDay, endOfDay, add, isAfter,isBefore} from 'date-fns';

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
        const availability = new Availability({
            instructor:Instructor,
            weekly_availability:[
            {
                weekday:"Sunday",
                weekend:true
            },
            {
                weekday:"Monday",
                weekend:false,
                startTime:"0800",
                endTime:"1800",
            },
            {
                weekday:"Tuesday",
                weekend:false,
                startTime:"0900",
                endTime:"1900",
            },
            {
                weekday:"Wednesday",
                weekend:false,
                startTime:"0800",
                endTime:"1600",
            },
            {
                weekday:"Thursday",
                weekend:false,
                startTime:"0800",
                endTime:"1800",
            },
            {
                weekday:"Friday",
                weekend:false,
                startTime:"0700",
                endTime:"1600",
            },
            {
                weekday:"Saturday",
                weekend:true
            }
        ]
        })
        await Instructor.save();
        await availability.save();
        return res.status(200).json(Instructor);
    }catch(error){
            next(error);
    }
}

export const getInstructorAvailability = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const availability = await Availability.find({instructor:id});
        return res.status(200).json(availability);
    }catch(error){
            next(error);
    }
}

export const getInstructorWeeklyAvailability = async(req,res,next)=>{
    try{
        const currentDate = new Date;
        const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
        const id = req.body.id;
        const endOfWeek = add(startOfWeek,{weeks:1});
        const allSchedule = await Schedule.find({
            instructor: id
        });
        const scheduleOfTheWeek = allSchedule.filter((schedule)=>{
            return isAfter(schedule.booked_schedule.start_time,startOfWeek) && isBefore(schedule.booked_schedule.start_time,endOfWeek)
        })
        //generate availability array, subtract filled timeslot from schedule
        const availability = await Availability.findOne({instructor:id});
        let availabilityList = [];
        let weekday = 0;
        availability.weekly_availability.forEach((avail)=>{
            if(!avail.weekend){
                let startHour = parseInt(avail.startTime.substr(0,2));
                let endHour = parseInt(avail.endTime.substr(0,2));
                let timeslots = [];
                for(let i = startHour ; i < endHour ; i++){
                    let time = add(startOfWeek,{days:weekday});
                    time.setHours(i);
                    let endTime = add(time,{hours:1})
                    //test if lesson startTime is between the timeslot 
                    const alreadyHaveLesson = scheduleOfTheWeek.findIndex((schedule)=>{
                        //console.log(schedule.booked_schedule.start_time + " after=" + isAfter(schedule.booked_schedule.start_time, time) + " before=" + isBefore(schedule.booked_schedule.start_time,endTime))
                        return isAfter(schedule.booked_schedule.start_time, time) && isBefore(schedule.booked_schedule.start_time,endTime)
                    }) > -1;
                    if(!alreadyHaveLesson){
                        timeslots.push((i < 10? '0' + i : i) + '00');//'0800'
                    }
                }
                availabilityList.push({
                    weekday:avail.weekday,
                    timeslot:timeslots
                });
            }
            weekday ++;
        })
        //return generated timeslot for the week
        return res.status(200).json(availabilityList);
    }catch(error){
        console.log(error);
        next(error);
    }
}