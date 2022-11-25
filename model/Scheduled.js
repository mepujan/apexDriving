import mongoose,{
    Schema
} from "mongoose";

const ScheduleModelSchema = new mongoose.Schema({
    
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    
    instructor: {
        type: Schema.Types.ObjectId,
        ref: "Instructor"
    },

    booked_schedule: {
        start_time: {type: String, required: true},
        end_time: {type: String, required: true}
    }
});

export default mongoose.model("Schedule", ScheduleModelSchema);