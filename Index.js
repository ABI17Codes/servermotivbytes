import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import router from "./Router/router.js"
import cors from 'cors'
import cookieParser from "cookie-parser"


const app = express()
// app.use(cors({origin:"https://motivibytes.netlify.app",credentials:true}))
const corsOptions = {
  origin: "https://motivibytes.netlify.app",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization"
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(cookieParser())

app.use('/', router)

app.get('/', (req, res) => {
  res.send('Register endpoint');
});



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



