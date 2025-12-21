import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    fullname: {
        type:String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
       type:String,
       required: true,
    },
    profile: {
        type: String,
        default:"https://as2.ftcdn.net/v2/jpg/15/96/02/91/1000_F_1596029110_PXUNHtKIXYWBomxZ7GBG3Xsb0G3Jvnh4.jpg"
    },
    role: {
        type:String,
        enum: ['user', 'admin'],
        default: 'user',
    }

},{ timestamps: true });

export default mongoose.model("User", userSchema);