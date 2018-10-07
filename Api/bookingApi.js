var Booking=require('../model/booking');

// booking api

module.exports.bookBooking=function(req,res){
	var data=req.body;
	var saveData=new Booking(data);
	saveData.save(function(err,success){
		if(err){
			res.send(err);
		}
		else{
			res.send(success)
		}
	});
}


// booking list by userid 
module.exports.myBookingList=function(req,res){
	Booking.find({"userId":req.body.userId},function(err,success){
		if(err){
			res.status(500).send({ message: "somthing is wrong"} );
		}
		else{
			res.status(200).send({ result: success, message: "successful"});
		}
	})
}


