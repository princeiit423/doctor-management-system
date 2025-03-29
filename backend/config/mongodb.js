import mongoose from "mongoose";

const connectDB= async()=>{
    await mongoose.connect(`${process.env.MONGODB_URI}`)
    mongoose.connection.on('connected',()=> console.log("database connected"))
}

export default connectDB;