import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
        
cloudinary.config({ 
  cloud_name: process.env.CLOUNDINARY_NAME, 
  api_key: process.env.CLOUNDINARY_KEY, 
  api_secret: process.env.CLOUNDINARY_SECRET, 
});

const uploadOnCloudinary = async (localfilePath) =>{
    try{

        if(!localfilePath){ return null
        };
        
      const response = await cloudinary.uploader.upload(localfilePath,{
            resouce_type: "auto"
        })


       fs.unlinkSync(localfilePath)// localfilePath is removed when the upload is successful

        return response;

    }catch(error){
        console.log(error);
        fs.unlinkSync(localfilePath)
        return null;// localfilePath is removed when the upload is failed

    }
}


export  {uploadOnCloudinary};