const express=require('express');
const { createSlide, getSlide} =require('../controllers/HomeController');

const HomeRoute=express.Router();
HomeRoute.post("/createslide",createSlide);
HomeRoute.get("/getSlide",getSlide);
module.exports=HomeRoute;