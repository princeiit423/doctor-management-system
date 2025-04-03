import express from 'express'
import {userRegister, userLogin, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay} from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';
const userRouter = express.Router();

userRouter.post('/register', userRegister);
userRouter.post('/login',userLogin);
userRouter.get('/get-profile', authUser ,getProfile);
userRouter.post('/update-profile',upload.single('image'), authUser, updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment);
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment', authUser,cancelAppointment);
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verify-razorpay',authUser,verifyRazorpay);

export default userRouter;