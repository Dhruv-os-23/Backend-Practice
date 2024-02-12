import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectdb = async ()=>{
    try{
       const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       console.log("Connected to database");
   
    
    }catch(err){
        console.log(err);
        process.exit(1);

        
    }
    
}


export default connectdb;