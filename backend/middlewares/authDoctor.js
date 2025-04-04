import jwt from 'jsonwebtoken';

//doctor authentication function

const authDoctor = async (req,res,next)=>{
    try {
        const {dtoken} =  req.headers;
        if(!dtoken){
          return  res.json({success:false, message: 'Invalid token'})
        }
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
        req.body.docId=token_decode.id
        next();
         
    } catch (error) {
       return res.json({success:false, error:error.message});
    }
}

export default authDoctor;