import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from '../models/userModel.js';

//api for admin doctor

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      res.json({ success: "false", message: "Missing details" });
    }
    if (!validator.isEmail(email)) {
      res.json({ success: "false", message: "Invalid email" });
    }
    if (password.length < 8) {
      res.json({
        success: "false",
        message: "Password should be at least 8 characters long",
      });
    }
    if (!imageFile) {
      res.json({ success: "false", message: "Please upload an image" });
    }
    //hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //image url from cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // create new doctor data
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    //save detail in data base
    await newDoctor.save();

    res.json({ success: "true", message: "Doctor added successfully" });
  } catch (error) {
    res.json({ success: "false", message: error.message });
  }
};

// api for admin login logic


const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: "true", token });
    } else {
      res.json({ success: "false", message: "Invalid email or password" });
    }
  } catch (error) {
    res.json({ success: "false", message: error.message });
  }
};

// API to get all doctors list

const allDoctors = async (req,res)=>{
  try {
    const doctors = await doctorModel.find({}).select('-password')
    res.json({success:true,doctors})
  } catch (error) {
    res.json({success:false, message:error.message})
  }
}

// API to get all appointment list

const appointmentsAdmin = async (req,res)=>{
  try {
    const appointments = await appointmentModel.find({})
    res.json({success:true,appointments})
  } catch (error) {
    res.json({success:false,message:error.message});
  }
}

// API for appointment cancellation
const appointmentCancel = async (req,res)=>{
  try {
      const { appointmentId}= req.body;

      const appointmentData = await appointmentModel.findById(appointmentId);

      
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

// API for dashboard data for admin panel
const adminDashboard = async (req,res)=>{
  try {
    const doctors= await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})
    const dashData = {
      doctors: doctors.length,
      appointments:appointments.length,
      patients:users.length,
      latestAppointments: appointments.reverse().slice(0,5)
    }
    res.json({success:true,dashData})
  } catch (error) {
    res.json({error:error.message});
  }
}


export { addDoctor, adminLogin, allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard };
