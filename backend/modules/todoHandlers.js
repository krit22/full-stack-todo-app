import { TodoModel } from "../../db/models/todo.model.js";


export function allTodoHandler(req,res){
    
}

export async function addTodohander(req,res){
    try{
        await TodoModel.create({
            id:req.currentUserId,
            title:req.body.title,
            description:req.body.description,
            status:0
        })

        res.json({
            message:"Successfully added todo to the database"
        })
    }catch(e){
        res.json({
            message:"Could not aadd todo to the database"
        })
    }
}

export function deleteTodoHandler(req,res){

}