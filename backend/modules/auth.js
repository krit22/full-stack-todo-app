import { userModel } from "../../db/models/user.model.js";
import jwt from 'jsonwebtoken'
import dotenev from 'dotenv'
dotenev.config({path:"./../.env"});


export async function auth(req,res,next){
    try{
        console.log("authenticating a request...")
        const token=req.headers.token;
        const {id}=jwt.verify(token,process.env.JWT_SECRET)
        const currentUser=await userModel.findById(id);

        if(currentUser){
            req.currentUserId=currentUser.id;
            next();
        }

    }catch(e){
        res.json({
            message:'could not authenticate user'
        })
    }
}