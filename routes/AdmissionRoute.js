const express=require('express');
const submitAdmission=require('../controllers/AdmissionController');
const AdmissionRoute=express.Router();

AdmissionRoute.post('/Users',submitAdmission);
module.exports=AdmissionRoute;