import express from 'express';
import cors from 'cors'

import authRouter from './routes/authRoutes.js';
import connectionDB from './databaseConnection.js';
import { config } from './configuration/config.js';


// initializing port number
const PORT = process.env.PORT || 3000;

// setting up the projects
const app = express();
app.use(cors());
app.use(express.json());

//using middlewares for routes
app.use(authRouter);


// connecting to database and starting the server asynchronously
const Start = async() =>{
    try{
        await connectionDB(config.databaseString);
        app.listen(PORT,()=>{
            console.log("Successfully Connected to Database.");
            console.log(`Server is running on port ${PORT}`)
        });
    }catch(error){
        console.log(error);
        console.log("Failed To Connect to Database. Server is not running");
    }
    
}

Start();

