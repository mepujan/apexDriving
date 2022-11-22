import mongoose from "mongoose";

const AvailabilityModelSchema = new mongoose.Schema({
    
    instructor: {
        type: Schema.Types.ObjectId,
        ref: "instructor",
        required: [true,"Instructior Id is required"]
    },
    
    weekly_availability: {
        week_name: {
            start_time: {
                type: String, 
                required: true
            },
            end_time: {
                type: String, 
                required: true
            }
        }
    }
});

export default mongoose.model("Schedule", AvailabilityModelSchema);