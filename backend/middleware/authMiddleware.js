import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

const protect = asyncHandler(async(req,res,next)=>{
  let token; //Declare the token
  
  
  token =  req.cookies.jwt;
  console.log(token);
  if(token){
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.userId).select('-password');

      next()
    } catch (error) {
      res.status(401);
      throw new Error('No authorized, token failed')
    }
  }else{
     res.status(401);
     throw new Error('No authorized, no token')
  }
})

export {protect}