import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const registerUser = asyncHandler(async (req,res)=>{

    //get user details from frontend
    // validation like empty fields, correct format 
    // check if same user exists already
    // check for image 
    // upload to cloudinary
    // create user object , creae entery in db 
    // remove password and refresh token from response 
    // check if user creation , if yes return response 


    const {username, email, fullname,password} = req.body;
    
    if([username, email, fullname, password]. some((field)=> field?.trim()==="")
    ){
        throw new ApiError(400, "Please fill all the fields");

     }

     const existingUser = await User.findOne({
        $or: [{username},{email}]
    });

    if(existingUser){
        throw new ApiError(409, "User already exists");
    }

    const avatarLocalPath=req.files?.avatar[0]?.path;
   // const coverImagePath = req.files?.coverimage[0]?.path;
   let coverImagePath ;
   if(req.files && Array.isArray(req.files.coverimage) && req.files.coverimage.length > 0){
    coverImagePath= req.files.coverimage[0].path;
   }

    console.log(avatarLocalPath)

    if(!avatarLocalPath){
        throw new ApiError(400, "Please upload an avatar");
    }

    const avatar= await uploadOnCloudinary(avatarLocalPath)
    const coverimage = await uploadOnCloudinary(coverImagePath)
    

    console.log(avatar)
    if(!avatar){
    throw new ApiError(400, "Could not upload avatar");
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        fullname,
        password,
        avatar: avatar.url,
        coverimage: coverimage?.url || ""
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refereshToken")// to remove fields that we dont want to show

    if(!createdUser){
    throw new ApiError(500, "Could not create user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User created successfully"
    ));
   
})


export {registerUser}
