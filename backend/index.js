import express from 'express'
import {authRoutes} from "./routes/auth.routes.js"
import {userRoutes} from "./routes/user.routes.js"
import { connectToDb } from '../db/connect.js';
import cors from 'cors'
import { auth } from './modules/auth.js';

const app=express();
app.use(express.json());
app.use(cors());

app.use("/auth",authRoutes)

app.use(auth)
app.use("/todo",userRoutes)

connectToDb(app);
