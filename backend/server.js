import express from 'express'
import multer from 'multer'
import cors from 'cors'
import 'dotenv/config'
import connectDB from  './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

//app config
const app = express();
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: 'https://doc-nest-five.vercel.app',
    methods: 'GET,POST,PUT,DELETE', // Allow specific HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
  })
);
  
//api endpoints

app.use('/api/admin', adminRouter)
//localhost:4000/api/admin/add-dcotor

app.use('/api/doctor',doctorRouter)

app.use('/api/user', userRouter)
app.get('/', (req,res)=>{
    res.send("API works");
})

app.listen(port,()=>{
    console.log('server started on port:', + port);
})