import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,

}))

app.use(express.json({limit: "20kb"}));
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());



const app = express();


export {app};