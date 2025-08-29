import express from 'express'
import { adddoctor } from '../controllers/adminControlers.js'
import upload from '../middlewares/multer.js'


const adminRouter = express.Router()

adminRouter.post('/add-doctor',upload.single('image'),adddoctor)

export default  adminRouter