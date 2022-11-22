import mongoose from "mongoose";
import validator from "validator";
import uniqueValidator from 'mongoose-unique-validator';

const UserModelSchema = new mongoose.Schema({

    full_name: {
        type: String,
        required: [true, "Full Name is Required."]
    },

    email: {
            type: String, 
            lowercase: true,
            unique: [true,"Email Already Exist."],
            required: [true,"Email is Required"],
            validate:[validator.isEmail,"Invalid Email Address"]
    },

    user_name: {
        type: String,
        required: [true,"username is required"]
    },

    hash_password: {
        type: String,
        required: [true,'Password is required']
    },

    mobile_number: {
        type: String,
        required: [true,"mobile number is required"]
    }
});

UserModelSchema.plugin(uniqueValidator);


export default mongoose.model("User", UserModelSchema); 