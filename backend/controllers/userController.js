import userModel from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';
import appointmentModel from '../models/appointmentModel.js';
import doctorModel from '../models/doctorModel.js';

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
        //console.log(imageFile);
        if(!name || !phone || !address || !dob || !gender){
            return res.json({success:false,message:"All fields are required"});
        }
         await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender});

        if(imageFile){
                const filePath = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
                const imageUrl = filePath.secure_url;
                
                await userModel.findByIdAndUpdate(userId,{image:imageUrl});
        }
        return res.json({success:true, message:"Profile updated"});
        
    } catch (error) {
        res.json({message:error.message});
    }
}


//ApI for book appointment logic
const bookAppointment = async (req,res)=>{
    try {
        const {userId, docId, slotDate, slotTime}= req.body;

        const docData = await doctorModel.findById(docId).select('-password');
        if(!docData.available){
            return res.json({success:false,message:"Doctor not available"});
        }
        let slots_booked = docData.slots_booked;
        // checking for slot availablility
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false, message:"Slot not Available"});
            } else{
                slots_booked[slotDate].push(slotTime)
            }
        } else{
            slots_booked[slotDate]=[]
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password')
        delete docData.slots_booked

        const appointmentData= {
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            docData,
            amount:docData.fees,
            date: Date.now()

        }
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save();

        //save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true, message:'Appointment Booked'});

    } catch (error) {
        res.json({message:error.message});
    }
}

//API to get user appointment details

const listAppointment = async (req,res)=>{
    try {
        const {userId} = req.body;

        const appointments = await appointmentModel.find({userId})

        res.json({success:true, appointments})
        
    } catch (error) {
        res.json({message:error.message});
    }
}

// API to cancel appointment

const cancelAppointment = async (req,res)=>{
    try {
        const {userId, appointmentId}= req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        // verify appointment user
        if( appointmentData.userId !== userId){
            return res.json({success:false,message:"Unauthorized action"})
        }
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        // releasing doctor slot
        const {docId, slotDate, slotTime}= appointmentData
        const doctorData = await doctorModel.findById(docId)
        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e=> e !== slotTime)
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true,message:"Appointment cancelled"});
    } catch (error) {
        res.json({message:error.message});
    }
}
export { userRegister , userLogin, getProfile, updateProfile, bookAppointment,listAppointment, cancelAppointment};