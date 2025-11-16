import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: "../.env" });


export async function connectToDb(app){
    try{
        // console.log(process.env.MONGO_DB_URL)
        await mongoose.connect(process.env.MONGO_DB_URL)  
        console.log("Successfully connected to the database") 
        app.listen(3000,()=>{console.log("listening on port 3000")})
    }catch(e){
        console.log("could not connect to the database")
        // console.log(e)
    }
}
