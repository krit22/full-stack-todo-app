import bcrypt from "bcryptjs";
import { userModel } from "../../db/models/user.model.js";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config({path:"./../.env"})

const {JWT_SECRET}=process.env;

export async function siginhandler(req,res){
    const {username,password}=req.body;
    try{
        //checks if user exists in dataabase
        const currentUser= await userModel.findOne({username});

        if(currentUser){
            //checks password, and returns token
            if(await bcrypt.compare(password,currentUser.password)){
                const token=jwt.sign({id:currentUser.id},JWT_SECRET)
                res.json({
                    message:"Sign-in successful",
                    token,
                    status:1
                })
            }else res.json({
                message:"Incorrect password",
                status:0
            })
        }else{
            res.json({
                message:"Username does not exist, please signup first",
                status:0
            })
        }
    }catch(e){
        res.json({
            message:"Some error occured finding the username",
            status:0
        })
        console.log("Some error occured finding the username")
    }
}