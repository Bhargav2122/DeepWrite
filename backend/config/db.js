import mongoose from "mongoose";

const connectDB = async() => {
    try {
         await mongoose.connect(process.env.MONGO_URI);
         console.log('mongodb connected');
    } catch(err) {
        console.error("Mongodb not connected", err);
    }
   
} 

export default connectDB;