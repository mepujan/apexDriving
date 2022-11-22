import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';

import authRouter from './routes/authRoutes.js';
import connectionDB from './databaseConnection.js';
import { config } from './configuration/config.js';
import { ErrorHandler } from './middleware/ErrorHandler.js';


// initializing port number
const PORT = process.env.PORT || 3000;

// setting up the projects
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

//using middlewares for routes
app.use(authRouter);
app.use(ErrorHandler)


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

