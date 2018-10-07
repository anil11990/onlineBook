const express=require("express");
const router=express.Router();
// var verify =require('../middleware/verifyToken');
const bookApi = require("../Api/bookApi");

router.post('/addBook',bookApi.addBook);
router.post('/editBook',bookApi.editBook);
router.post('/deleteBook',bookApi.deleteBook);
router.get('/availableBookList',bookApi.availableBookList);










module.exports=router;