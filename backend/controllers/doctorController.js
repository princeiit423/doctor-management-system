import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const changeAvailability = async (req,res)=>{
    try {
        const {docId} = req.body;
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})
        res.json({success:true,message:"Availability change"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

const doctorsList = async(req,res)=>{
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true,doctors})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// API for doctor login

const loginDoctor= async(req,res)=>{
    try {
        const {email,password}= req.body;
        const doctor = await doctorModel.findOne({email})
        if(!doctor){
            return res.json({success:false,message:"Unvalid credentials"})
        }
        const isMatch = await bcrypt.compare(password,doctor.password)
        if(isMatch){
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// API to get doctor appointments for doctor panel

const appointmentsDoctor = async(req,res)=>{
    try {
        const {docId} = req.body;
        const appointments = await appointmentModel.find({docId})
        res.json({success:true,appointments})
        
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
// API to mark appointment completed for doctor panel

const appointmentComplete = async (req,res)=>{
    try {
        const {docId,appointmentId}= req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
            return res.json({success:true,message:"Appointment Completed"})            
        } else{
            return res.json({success:false,message:"Mark Failed"})
        }
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

// API for Appointment cancelled

const appointmentCancelled = async (req,res)=>{
    try {
        const {docId,appointmentId}= req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
            return res.json({success:true,message:"Appointment Cancelled"})            
        } else{
            return res.json({success:false,message:"Cancelled Failed"})
        }
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

// API to get dashboard data for doctor panel

const doctorDashboard = async(req,res)=>{
        try {
            const {docId}= req.body;
            const appointments = await appointmentModel.find({docId})
            let earnings = 0;

            appointments.map((item)=>{
                if(item.isCompleted || item.payment){
                    earnings += item.amount
                }
            })
            let patients = []
            appointments.map((item)=>{
                if(patients.includes(item.userId)){
                    patiennts.push(item.userId)
                }
            })

            const dashData = {
                earnings,
                appointments: appointments.length,
                patients: patients.length,
                latestAppointments: appointments.reverse().slice(0,5)
            }

            res.json({success:true,dashData})
        } catch (error) {
            res.json({success:false, message:error.message})
        }
}

// API to get Doctor profile

const doctorProfile = async(req,res)=>{
    try {
        const {docId} = req.body;
        const profileData = await doctorModel.findById(docId).select('-password')
        res.json({success:true,profileData})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

// API to update doctor profile

const updateDoctorProfile = async(req,res)=>{
    try {
        const {docId,fees,address,available}= req.body;

        await doctorModel.findByIdAndUpdate(docId,{fees,address,available})
        res.json({success:true,message:"Profile Updated"})
    } catch (error) {
     res.json({success:false, message:error.message})
    }
}


export {changeAvailability, doctorsList,loginDoctor,appointmentsDoctor, appointmentComplete,appointmentCancelled,doctorDashboard, doctorProfile,updateDoctorProfile}