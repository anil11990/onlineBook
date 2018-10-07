var mongoose = require('mongoose');
var Schema = mongoose.Schema;
  ObjectId = Schema.ObjectId;  
var bookingSchema = new Schema({
        userId: {
            type: ObjectId,
            required:true    
        },
        bookId: {
            type: ObjectId,
            required:true
        },
        quantity: {
            type: Number,
            required:true
        },
        status: {
            type: Number,
            default: 1 // status 1 is Active and 0 is Delete
        },
        bookingDate: {
            type: Date
        },
        from:{
            type:Date,
            required:true
        },
        to:{
            type:Date,
            required:true
        }
        
    });
module.exports = mongoose.model('Booking', bookingSchema);