import User from '../models/user.js'
import asyncHandler from 'express-async-handler';
import generatetoken from '../utils/generatetoken.js';
import bcrypt from 'bcryptjs';

const register = asyncHandler( async (req, res) => {
    const { fullname, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if(userExists) {
        return res.status(400).json({ msg: "user already exists"});  
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = email === process.env.ADMIN_EMAIL ? "admin" : "user";
    
    const user = await User.create({fullname, email, password: hashedPassword, role});
    const token = generatetoken(user);
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: "none"});

    res.status(200).json({
       
        _id: user._id, 
       fullname: user.fullname,
       email: user.email,
       role: user.role
    });
    
});

const login = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const user = await  User.findOne({ email });
    if(!user){
        return res.status(400).json({msg: "invalid email"});

    }
    const isPassword = await bcrypt.compare(password, user.password);
    if(!isPassword){
      return res.status(400).json({msg: "incorrect password"});
    }
     const token = generatetoken(user);
    res.cookie('token', token, { httpOnly: true, secure:true, sameSite:"none"});

    res.status(200).json({
        
        _id: user._id, 
       fullname: user.fullname,
       email: user.email,
       role: user.role
    });
}); 

const logout  = asyncHandler(async( req, res )=> {
   res.clearCookie("token");
   res.json({ msg: "logged out" })
});
export { register, login, logout };