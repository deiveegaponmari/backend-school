const express=require('express');
const AnnouncementController=require('../controllers/AnnouncementController');
const {authMiddleware,adminMiddleware}=require('../middlewares/authMiddleware')
 
const AnnounceRoute=express.Router();

AnnounceRoute.post('/announce',authMiddleware,adminMiddleware,AnnouncementController)

module.exports=AnnounceRoute;