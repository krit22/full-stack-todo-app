import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    username:String,
    password:String
})

export const userModel=mongoose.model("users",userSchema);