const express=require("express");
const router=express.Router();
const bookingApi = require("../Api/bookingApi");

router.post('/bookBooking',bookingApi.bookBooking);
router.post('/myBookingList',bookingApi.myBookingList);







module.exports=router;