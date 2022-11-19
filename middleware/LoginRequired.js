import jwt from 'jsonwebtoken';
const SECRET_KEY = "ApexDrivingApp123@";


export const LoginRequired = async(req,res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if(authHeader){
            const token = authHeader.split(' ')[1]
            await jwt.verify(token,SECRET_KEY,(err,user)=>{
                if(err){
                    return res.status(401).json({message: "Unauthorized User"});
                }
                req.user = user;
                next();
            });
        }
        else{
            return res.status(401).json({message: "Unauthorized User"});
        }

    }catch(error){
        res.status(401).json({message:"Unauthorized User"})
    }

}