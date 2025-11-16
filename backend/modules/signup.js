// import express from "express"
import jwt from 'jsonwebtoken'
import brcrypt from 'bcryptjs'
import { userModel } from '../../db/models/user.model.js';
import bcrypt from 'bcryptjs';


export async function signupHandler(req,res){
    const {username}=req.body;
    const {password}=req.body;
    

    //check if user already exists
    try{
        const found=await userModel.findOne({
            username
        })

        if(found){
                res.json({
                message:"User already exists",
                status:0
            })
            return;
        }
    }catch(e){
        res.json({
            message:"some error occured"
        })
        console.log("some error occured");
    }

    //create new user in database
    try{
        const hashedPassword=await bcrypt.hash(password,5);
        await userModel.create({
            username,
            password:hashedPassword
        });
        res.json({
        message:"added user sucessfully",
        status:1
    })
    }catch(e){
        console.log("Could not add user to database");
        res.json({
            message:"Could not add user to database",
            status:0
        })
    }
    
}