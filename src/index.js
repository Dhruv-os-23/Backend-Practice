
import dotenv from "dotenv";

dotenv.config({
    path: "./env"
});


import express from "express";
import connectdb from "./db/index.js";
import {app} from './app.js'





 connectdb()
 .then(()=>{
     app.listen(process.env.PORT || 4000, ()=>{
         console.log("Server is running on port", process.env.PORT);
     })
 })
 .catch((err) =>{
     console.log("connection error", err); })

// export {app}