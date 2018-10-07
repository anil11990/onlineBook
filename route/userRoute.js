const express=require("express");
const router=express.Router();
var verify =require('../middleware/verifyToken');
const userApi = require("../Api/userApi");

//class route
router.post('/addClass',userApi.addClass);
router.post('/editClass',userApi.editClass);
router.post('/deleteClass',userApi.deleteClass);
//user route
router.post('/signup', userApi.signup);
router.post('/login',userApi.login);
router.post('/getProfile',userApi.getProfile);
router.post('/updateProfile',userApi.updateProfile);
router.post('/changePassword',userApi.changePassword);
router.post('/forgotPassword',userApi.forgotPassword);
router.post('/searchUserBooklist',userApi.searchUserBooklist);


// export module to allow it to be imported in other files
module.exports=router;