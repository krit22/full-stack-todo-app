import express from 'express'
const router=express.Router()
import { allTodoHandler,addTodoHandler,deleteTodoHandler } from '../modules/todoHandlers.js'

router.get("/all",allTodoHandler)
router.post("/add",addTodoHandler)
router.post("/delete",deleteTodoHandler)

export const userRoutes=router;
