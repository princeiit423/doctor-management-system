import userModel from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//api for user registration

const userRegister = async (req,res)=>{
    try {
        const {name, email,password}= req.body;
        if(!name ||!email || !password){
           return res.json({success:false,message:"Missing details"});
        }
        if(!validator.isEmail(email)){
           return res.json({success:false, message:"Invalid email"})
        }
        if(password.length < 8){
           return res.json({success:false, message:"Create Strong password min 8 digit"})
        } else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            const user = new userModel({name,email,password:hashedPassword});
            const newUser = await user.save();

            const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET )

           return res.json({success: true, token})
        }
        
    } catch (error) {
        return res.json(error.message);
    }
}

export default userRegister;