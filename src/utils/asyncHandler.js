const asyncHandler = (requestHandler) =>{
    (req,res,next)=>{
        Promise.resolve(request(req,res,next)).
        catch((err)=> next(err));
    }
}

export { asyncHandler }