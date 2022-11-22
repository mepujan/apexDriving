import mongoose from "mongoose";

const AvailabilityModelSchema = new mongoose.Schema({
    
    instructor: {
        type: Schema.Types.ObjectId,
        ref: "instructor",
        required: [true,"Instructior Id is required"]
    },
    
    weekly_availability: {
        type: Array,
        default:[],
    }
});

export default mongoose.model("Schedule", AvailabilityModelSchema);