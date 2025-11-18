const express=require('express');
require("dotenv").config()
const connectDB=require('./config/dbConfig')
const UserRouter=require("./routes/UserRoute");
const bodyParser = require('body-parser');
const app=express();
//middleware json
app.use(bodyParser.json());
app.get("/",(req,res)=>{
    res.send("Welcome to backend!!!!school project")
})
//database connection
connectDB();
//Routes
app.use("/api/user",UserRouter)
app.listen(process.env.PORT,()=>{
    console.log(`server running successfully http://localhost:${process.env.PORT}`)
})