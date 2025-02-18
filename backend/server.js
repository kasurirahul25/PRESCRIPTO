import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectcloudinary from './config/cloudinary.js'
// app config
const app = express()
const port = process.env.PORT || 4000

connectDB()
connectcloudinary()
// middleare
app.use(express.json())
app.use(cors())


// api end point
app.get('/',(req,res)=>{
    res.send("Api is working and fine")
})

app.listen(port,()=>console.log("Server is started at",port))