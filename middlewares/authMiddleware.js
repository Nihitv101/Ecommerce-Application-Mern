import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js';

// Protected Route

export const requireSignIn = async(req, res ,next)=>{
    try{
        const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;

        next(); 
    }
    catch(err){
        console.log(err);
    }

}

// admin access:
export const isAdmin = async(req, res, next)=>{
    try{


        const user =await userModel.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).json({
                success:false,
                message:'Unauthorize Access',
            })
        }
        else{
            next();
        }
    }
    catch(err){
        console.log(err);
        res.status(401).json({

            success:false,
            message:'Error in admin middleware',
            err,
        })
    }
}


