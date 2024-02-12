import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET, 
});


const uploadOnCloudinary = async (localfilePath) =>{
    try{

        if(!localfilePath) return null;
        
      const response = await  cloudinary.uploader.upload(localfilePath,{
            resouce_type: "auto"
        })


        console.log("Uploaded");
        console.log(response);

        return response.url;

    }catch(e){

        fs.unlinkSync(localfilePath)// localfilePath is removed when the upload is failed

    }
}


export default uploadOnCloudinary;