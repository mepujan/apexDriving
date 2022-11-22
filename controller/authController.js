import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import {config} from '../configuration/config.js';
import bcrypt from 'bcrypt';


/**
 * @returns json response containing user details and JWT token if user is authenticated
 * otherwise unauthorized user message is returned with 401 status code
 */
export const Login = async(req,res,next) =>{
      try{
      const { email, password} = req.body;
      const user = await User.findOne({email:email});
      if(user){
            const doesPasswordMatch = await bcrypt.compare(password,user.hash_password);
            if(doesPasswordMatch){
                  user.hash_password = null;
                  const token = jwt.sign({email: user.email, id: user._id, user_name: user.user_name},config.secret_key);
                  return res.status(200).json({user: user, token: token});

            }
            else{
                  return res.status(401).json({message: "Unauthorized User"});
            }

      }
      else{
            return res.status(401).json({message: "Unauthorized User."});
      }
      }catch(error){
            next(error);
      }
}


/**
 * function that takes data from req body and validates it and saves it to database
 * raw password will be hashed before saving it to database
 * @returns json response containing user details and JWT token if user is authenticated
 * otherwise unauthorized user message is returned with 401 status code
 */

export const SignUp = async(req,res,next) =>{
      try{
            const { password } = req.body;
            const newUser = new User(req.body);
            const hashPassword = await bcrypt.hash(password,10);
            newUser.hash_password = hashPassword;
            const result = await newUser.save();
            const token = jwt.sign({email: result.email, id: result._id, username: result.user_name},config.secret_key)
            return res.status(201).json({user: result, token: token});
      }catch(error){
            next(error);
      }
}