import dotenv from "dotenv";
import User from "../Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { authMiddleware } from "../MIddlewares/authMiddleware.js";

dotenv.config();

const createUser = async (req , res) => {
    const {name , email , password , role} = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);

     if(!name || !email || !password){
        return res.status(400).json({message: "ALL FIELDS ARE REQUIRED"});
     }

     if(email){
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User with this email already exists"});
        }
     }


     if(password.length < 6){
        return res.status(400).json({message: "Password must be at least 6 characters long"});
     }


     
    try {
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role

        });

        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
}




// login user controller
const loginUser = async (req , res) => {
    const {email , password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid email or password"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid email or password"});
        }
        const token = jwt.sign({
            id: user.id,
            role: user.role
        } , process.env.JWT_SECRET);

        res.cookie("token" , token);

        res.status(200).json({
            message: "Login successful",
            user,
            token
        });


    } catch (error) {
           res.status(500).json({
            message: "Error logging in user",
            error: error.message
           });
    }


}


// profile 
const getProfile = async (req , res) =>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.status(200).json({
            message: "User profile fetched successfully",
            user
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Error fetching profile",
            error: error.message
        });
    }

}


// get users for user management (admin only)
const getUsers = async (req , res) =>{
    try {
        const users = await User.find().select("-password");
        res.status(200).json({
            message: "Users fetched successfully",
            users
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error: error.message
        });
    }
}

// exporting all controllers

export  { createUser , loginUser , getProfile , getUsers};

