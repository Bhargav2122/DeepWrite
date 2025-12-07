import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';


export const verify = asyncHandler( async(req, res, next) => {
    let token;
    if(req.cookies.token){
        token = req.cookies.token;
    } else if(req.headers.authorization?.startsWith("Bearer ")){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
       return res.status(401).json({ msg: "UnAuthorized user"});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch( error) {
        return res.status(401).json({msg: "token invalid"});
    }
});

export const isAdmin = (req, res, next )=> {
    if(req.user && req.user.role === "admin"){
       return next();
    }
    else{
        return res.status(403).json({msg: "you are not admin"})
    }
   
}