const express=require('express');
const {ParentController,getParentNumbers}=require('../controllers/ParentController')

const ParentRoute=express.Router();
ParentRoute.post("/parents",ParentController);
ParentRoute.get('/parents',getParentNumbers)

module.exports=ParentRoute;