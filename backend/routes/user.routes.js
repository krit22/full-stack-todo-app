import express from 'express'
const router=express.Router()
import { allTodoHandler,addTodohander,deleteTodoHandler } from '../modules/todoHandlers.js'

router.get("/all",allTodoHandler)
router.post("/add",addTodohander)
router.post("/delete",deleteTodoHandler)

export const userRoutes=router;
