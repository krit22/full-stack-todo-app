import mongoose from 'mongoose'

const TodoSchema=new mongoose.Schema({
    title:String,
    description:String,
    id:String,
    status:Number
})

export const TodoModel=mongoose.model('todos',TodoSchema)