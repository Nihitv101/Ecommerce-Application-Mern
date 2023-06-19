import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import orderModel from '../models/order.model.js';



const registerController = async(req, res)=>{
    try{
        const {name, email, password, phone ,address, answer} = req.body;



        if(!name || !email || !password || !phone || !address || !answer){
            return res.json({error:"Invalid Credentials"});
        }

        // existing user:
        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.status(200).json({
                success:false,
                message:"Already Register Please Login",
            })
        }

        // register user:
        const hashedPassword = await hashPassword(password)

        const user = await userModel.create({name, email, phone, address, password:hashedPassword, answer});

        res.status(201).json({
            success:true,
            message:"User Created Successfully",
            user,
        })


    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:'Error in Registeration',
            err,
        })
    }


}


const loginController = async (req, res , next)=>{
    try{

        const {email, password} = req.body;
        // validation:
        if(!email || !password){
            return res.status(404).json({
                success:false,
                message:'Invalid Email of Password',
            })
        }

        const user = await userModel.findOne({email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"Email is not registered",
            })
        }
        const match = await comparePassword(password, user.password);

        if(!match){
            return res.status(200).json({
                success:false,
                message:"Invalid Password",
            })
        }

        // token:

        const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET ,{
            expiresIn:'7d',
        })

        res.status(200).json({
            success:true,
            message:"Login Successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,
            },
            token,
        })








    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:'Error in Login',
            err,
        })
    }



}



const testController = (req, res)=>{
    console.log('Protected')
    res.status(200).send("ok")

}




const forgotPasswordController = async(req, res)=>{
    try{
        const {email, answer, newPassword} = req.body;
        if(!email || !answer || !newPassword){
            res.status(400).json({
                message:"Invalid Credentials",
            })
        }


        const user = await userModel.findOne({email, answer})

        //validation

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            })
        }

        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, {password:hashed});


        return res.status(200).json({
            success:true,
            message:"Password Reset Successfullly",
        })
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Somethign went Wrong",
            err,
        })
    }

}



const updateProfileController = async(req, res)=>{
    try{
        const {name, email, password,address, phone} = req.body;
        const user = await userModel.findById(req.user._id);

        // password:

        if(password && password.lenngth < 4){
            return res.json({
                error:"Password is required and 4 characters long",
            })   
        }


        const hashedPassword = password ? await hashedPassword(password): undefined;


        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name:name || user.name,
            password:hashedPassword || user.password,
            phone:phone || user.phone,
            address:address || user.address,
        })

        res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            updatedUser,
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Something went Wrong in updating Profile",
            err,
        })
    }


}



const getOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while Geting Orders",
        error,
      });
    }
  };



//orders
const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: "-1" });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };



  //order status
const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };
  


export {registerController ,
    loginController, 
    testController,
    forgotPasswordController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController


};

