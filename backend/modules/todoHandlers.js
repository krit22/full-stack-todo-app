import { TodoModel } from "../../db/models/todo.model.js";
import mongoose from "mongoose";
import { userModel } from "../../db/models/user.model.js";

export async function allTodoHandler(req,res){
    const {currentUserId}=req;
    try{
      const todos=await TodoModel.find({
        id:currentUserId
      })
      console.log("returned all todos of the user",currentUserId)
      res.json({
        message:"Found your todos",
        todos
      })
    }catch(e){
      res.json({
        message:"An error occured finding todos",
        error:e
      })
    }
}

export async function addTodoHandler(req, res) {
  const { title, description } = req.body;
  try {
    const newTodo=await TodoModel.create({
        title,
        description,
        status:0,
        id:req.currentUserId
    });



    console.log("added a new todo of the user",req.currentUserId)
    res.json({
      message: "Successfully added todo",
      newTodoId:newTodo._id
    });
  } catch (e) {
    res.json({
      message: "Could not add todo",
    });
  }
}

export async function deleteTodoHandler(req,res) {
  const {idToDelete}=req.body;

  try{
    await TodoModel.findByIdAndDelete(idToDelete)
    console.log("Successfully deleted the todo with id:",idToDelete)
    res.json({
      message:"Successfully deleted the todo"
    })
  }catch(e){
    res.json({
      message:"An error occured deleting the todo"
    })
  }
}