var Book=require('../model/book');

// add book 
module.exports.addBook = function (req,res) {
	var data=req.body;
	var saveData=new Book(data);
	saveData.save(function(err,success){
		if(err){
			res.send(err);
		}
		else{
			res.send(success)
		}
	});
}


// edit book details
module.exports.editBook=function(req,res){
	Book.findByIdAndUpdate({"_id":req.body._id},{$set:{"totalBook":req.body.totalBook,"author":req.body.author,"tittle":req.body.tittle}},{new: true},function(err,success){
		if(err){
			res.status(500).sens( {message: "somthing is wrong" });
		}
		else if(success){
			res.status(200).json({ message: "successful" , success:1, statusCode:200});
		}
		else{
			res.send("id not found")
		}
	})
}	

// delete book by _id
module.exports.deleteBook=function(req,res){
	Book.findByIdAndUpdate({"_id":req.body._id},{$set:{"status":0}},{new: true},function(err,success){
		if(err){
			res.send(err)
		}
		else if(success){
			res.send(success)
		}
		else{
			res.send("id not found")
		}
	})
}	

// available book status
module.exports.availableBookList=function(req,res){
	Book.find({"status":1},function(err,success){
		if(err){
			res.send(err);
		}
		else{
			res.status(200).send({ result: success, message: "successful"});
		}
	})
}


