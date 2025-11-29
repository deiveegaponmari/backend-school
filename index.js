const express=require('express');
require("dotenv").config()
const connectDB=require('./config/dbConfig')
const UserRouter=require("./routes/UserRoute");
const AdmissionRoute=require("./routes/AdmissionRoute")
const HomeRoute=require("./routes/HomeRoute")
const bodyParser = require('body-parser');
const cors=require('cors')
const app=express();
//middleware json
app.use(bodyParser.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.send("Welcome to backend!!!!school project")
})
//database connection
connectDB();
//Routes
app.use("/api/user",UserRouter)
app.use("/api/admission",AdmissionRoute)
app.use("/api/homeslide",HomeRoute)
app.listen(process.env.PORT,()=>{
    console.log(`server running successfully http://localhost:${process.env.PORT}`)
})
/* anandraj30986@gmail.com */