import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import router from "./Router/router.js"
import cors from 'cors'
import cookieParser from "cookie-parser"


const app = express()
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json())
app.use(cookieParser())

app.use('/', router)





mongoose.connect(process.env.MONGODB_URI)
 .then(() => {
    console.log("DB connected successfully");
 }).catch((err) => {
    console.error(err);
 });

app.listen(process.env.PORT, ()=>{
   try {
    console.log("Server started listening on " + process.env.PORT);
   } catch (error) {
    console.error(error);
   }
})



