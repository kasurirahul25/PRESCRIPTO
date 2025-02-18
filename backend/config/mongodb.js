import mongoose from "mongoose"

const connectDB = async ()=>{

    mongoose.connection.on('connected',()=>{console.log("Connected Sucessfully!")})
    await mongoose.connect(`${process.env.MONGODB_URL}/doctor`)

}
export default connectDB