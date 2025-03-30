import jwt from 'jsonwebtoken';

//admin authentication function

const authAdmin = async (req,res,next)=>{
    try {
        const {atoken} =  req.headers;
        if(!atoken){
          return  res.json({success:false, message: 'Invalid token'})
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)
        if(token_decode !== process.env.ADMIN_EMAIL+ process.env.ADMIN_PASSWORD ){
           return res.json({success:false, message: 'Invalid token'})
        }
        next();
         
    } catch (error) {
       return res.json({success:false, error:error.message});
    }
}

export default authAdmin;