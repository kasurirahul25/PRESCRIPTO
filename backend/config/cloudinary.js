import { v2 as cloudinary} from 'cloudinary'

const connectcloudinary = async() =>{
    cloudinary.config({
        cloud_name :process.env.COULDNAIRY_NAME,
        api_key :process.env.COULDNAIRY_API_KEY,
        api_secret :process.env.COULDNAIRY_SECRET_KEY
    })
}

export default connectcloudinary