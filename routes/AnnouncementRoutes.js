const express=require('express');
const AnnouncementController=require('../controllers/AnnouncementController');
 
const AnnounceRoute=express.Router();

AnnounceRoute.post('/announce',AnnouncementController)

module.exports=AnnounceRoute;