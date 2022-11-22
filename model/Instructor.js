import mongoose from "mongoose";
import validator from "validator";


const InstructorModelSchema = new mongoose.Schema({

    full_name: {
        type: String,
        required: true
    },

    user_name: {
        type: String,
        required: true
    },

    email: {
            type: String,
            lowercase: true,
            unique: true,
            required: true,
            validate:[validator.isEmail,"Invalid Email Address"]
    },
    
    mobile_number: {
        type: String,
        required: true
    }
});

export default mongoose.model("Schedule", InstructorModelSchema);