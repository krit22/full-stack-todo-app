import { TodoModel } from "../../db/models/todo.model.js";
import mongoose from "mongoose";
import { userModel } from "../../db/models/user.model.js";

export function allTodoHandler(req,res){
    
}

export async function addTodoHandler(req, res) {
  const { title, description } = req.body;
  console.log(res.currentUserId)
  try {
    await TodoModel.create({
        title,
        description,
        status:0,
        id:req.currentUserId
    });

    res.json({
      message: "Successfully added todo",
    });
  } catch (e) {
    res.json({
      message: "Could not add todo",
    });
  }
}