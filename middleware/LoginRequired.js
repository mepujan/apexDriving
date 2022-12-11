import jwt from 'jsonwebtoken';
import { config } from '../configuration/config.js';


export const LoginRequired = async(req,res, next) => {
        try{
            let token = req.headers.authorization;
            if(token){
                token = token.split(' ')[1];
                let user = await jwt.verify(token,config.secret_key);
                req.userId = user.id;
            }else{
                return res.status(401).json({message:"Unauthorized User"});
            }
            next();
    
        }catch(error){
            res.status(401).json({message:"Unauthorized User"});
        }
}
