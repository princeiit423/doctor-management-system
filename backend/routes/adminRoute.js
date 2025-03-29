import express from 'express';
import upload from '../middlewares/multer.js';
import {addDoctor} from '../controllers/adminController.js'

const adminRouter = express.Router();

adminRouter.post('/add-doctor', upload.single('image'), addDoctor)

export default adminRouter;