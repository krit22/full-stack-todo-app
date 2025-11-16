import mongoose from 'mongoose'

const TodoSchema=new mongoose.Schema({
    id:String,
    title:String,
    description:String,
    status:Number
})

export const TodoModel=mongoose.model('todos',TodoSchema)