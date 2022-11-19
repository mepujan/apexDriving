import mongoose from "mongoose";

const connectionDB = (url) => mongoose.connect(
    url,{
        useNewUrlParser : true,
        useUnifiedTopology : true
    }
);

export default connectionDB;