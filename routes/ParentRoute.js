const express=require('express');
const {ParentController,getParentNumbers}=require('../controllers/ParentController')
const {authMiddleware,adminMiddleware}=require('../middlewares/authMiddleware')

const ParentRoute=express.Router();
ParentRoute.post("/addparents",authMiddleware,adminMiddleware,ParentController);
ParentRoute.get('/sendinfo-parents',authMiddleware,adminMiddleware,getParentNumbers)

module.exports=ParentRoute;