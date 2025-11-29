const express=require('express');
const submitAdmission=require('../controllers/AdmissionController');
const authMiddleware=require('../middlewares/authMiddleware')
const AdmissionRoute=express.Router();


AdmissionRoute.post('/Users',authMiddleware,submitAdmission);
module.exports=AdmissionRoute;