import jwt from 'jsonwebtoken';


export const Login = (req,res) =>{
      const { email, password} = req.body;
      

}


export const SignUp = (req,res) =>{
      console.log("User signup api");
      const user = new User(req.body);
      user.save();
}