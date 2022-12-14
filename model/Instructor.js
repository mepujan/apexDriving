import mongoose from "mongoose";
import validator from "validator";
import uniqueValidator from "mongoose-unique-validator";


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

InstructorModelSchema.plugin(uniqueValidator);

export default mongoose.model("Instructor", InstructorModelSchema);