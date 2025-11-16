import express from "express"
const router=express.Router();
import { signupHandler } from "../modules/signup.js"; 
import { siginhandler } from "../modules/signin.js";
router.post('/signup',signupHandler)
router.post('/signin',siginhandler)

export const authRoutes=router;