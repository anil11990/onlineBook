var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var bookSchema = new mongoose.Schema({ 
  title: { 
  	type: String, 
  	required: true 
  },
  author: { 
  	type: String, 
  	required: true
  	 },
  classId:{
  	type:String,
    required:true
  },
  totalBook: { 
  	type: Number 
  },
  status: {
    type: Number,
    default: 1 // status 1 is Active and 0 is inActive/delete
        }
});
module.exports = mongoose.model('Book', bookSchema);