
import dotenv from "dotenv";

dotenv.config({
    path: "./env"
});


import express from "express";
import connectdb from "./db/index.js";
const app = express();


connectdb();
.then(()=>{
    app.listen(process.env.PORT || 4000, ()=>{
        console.log("Server is running on port", process.env.PORT);
    })
})
.catch((err) =>{
    console.log("connection error", err);
})
