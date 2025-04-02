import userModel from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';

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

const userLogin = async (req,res)=>{
    try {
        const {email,password}= req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
            return res.json({success:true,token});
        } else{
            return res.json({success:false,message:"Invalid password"});
        }
    } catch (error) {
        res.json({error:error.message});
    }
}

// get all profile function
const getProfile = async (req,res)=>{
    try {
        const {userId}= req.body;
        if(userId){
            const userData= await userModel.findById(userId).select('-password');
           return res.json({success:true,message:"Data Fetch succesfully",userData});
        } else{
            return res.json({success:false,message:"User id is required"});
        }

    } catch (error) {
        res.json({error:error.message});
    }
}

// update profile function

const updateProfile = async (req,res)=>{
    try {
        const{userId,name,phone,address,dob,gender}= req.body;
        const imageFile = req.file;
        if(!name || !phone || !address || !dob || !gender){
            return res.json({success:false,message:"All fields are required"});
        }
         await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender});

        if(imageFile){
                const filePath = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
                const imageUrl = filePath.secure_url;
                await userModel.findByIdAndUpdate(userId,{imageUrl});
        }
        return res.json({success:true, message:"Profile updated"});
        
    } catch (error) {
        res.json({error:error.message});
    }
}

export { userRegister , userLogin, getProfile, updateProfile};