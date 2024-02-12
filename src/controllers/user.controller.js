import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req,res)=>{
    //console.log(req.body);
    res.status(200).json({
        //success: true,
        //data: req.body,
        message: "ok"
    })
})


export {registerUser}
