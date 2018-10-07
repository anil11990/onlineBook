var User=require('../model/user');
var Book=require('../model/book');
var Class=require('../model/class');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Nexmo = require('nexmo');
const sgMail = require('@sendgrid/mail');
var crypto=require('crypto');
var async=require('async');
var waterfall = require('async-waterfall');
var generateHash1 = require("../middleware/bcryptjs");
// add class 
module.exports.addClass = function (req,res) {
	var data=req.body;
	var saveData=new Class(data);
	saveData.save(function(err,success){
		if(err){
			res.send(err);
		}
		else{
			res.send(success)
		}
	});
}

// edit class
module.exports.editClass=function(req,res){
	Class.findByIdAndUpdate({"_id":req.body._id},{$set:{"class":req.body.class}},{new: true},function(err,success){
		if(err){
			res.send(err)
		}
		else if(success){
			res.status(200).send({ result: "", message: "class edited " , success:1, statusCode:200});
		}
		else{
			res.send("id not found")
		}
	})
}

// delete class (status:0)
module.exports.deleteClass=function(req,res){
	Class.findByIdAndUpdate({"_id":req.body._id},{$set:{"status":req.body.status}},{new: true},function(err,success){
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


//user(student) api 
// user registration 
module.exports.signup=function(req,res){
		User.findOne({"emailId":req.body.emailId ,"password":req.body.password},function(err,success){
        if(err){
			res.send(err);
		}
		else if(success){
			console.log("already registered")
			res.send(success);
		}
		else{
			generateHash1.generateHash(req.body.password,function(err,hash){
					console.log(err,hash)
				req.body.password = hash;
			//save newUser object to database
				var saveData=new User(req.body);
				saveData.save(function(err,success){
				if(err){
				console.log("err")
				res.send(err);
				}
				 else {
						res.status(200).json({ result: data, message: "successful" , success:1, statusCode:200});
						}
					})
				}) 
			}
		})
	}

//user login  
module.exports.login = function (req,res) {
		  User.findOne({"emailId":req.body.emailId},function(err,success){
        if(err){
			console.log("err")
			res.send(err);
		}
		else if(success){
			// console.log("login successfull");
			generateHash1.comparePassword(req.body.password,success.password,function(err,hash){
				if(err){
					res.send(err)
				}
				else if(hash){
			//genarate token//
			var token = jwt.sign(success.toJSON(), 'asdf');
			res.send({"success":success,"token":token});
			var nexmo = new Nexmo({
				     apiKey: "1d609b4f",
				     apiSecret: "D2XBLLYGw0CzPcEh",
				  });
				var verifyRequestId = null; // use in the check process
				// generate 4 digit random otp 
				 var x = Math.floor((Math.random() * 10000) + 1);
				var msg ="Your otp is :" + x
				nexmo.message.sendSms("NEXMO", "+918572969074", msg,function(err,text) {
					 if (err) {
					 	console.log('5555')
				       res.send('Oops! There was an error.');
				    } else {
			    	console.log(text);
				    	//update request id in user db
				    	// User.findByIdAndUpdate(success._id,{"$set":{requestId:text.messages[0]['message-id']}},function(err,success){
				    	// 	// res.send({"success":success,"token":token});
				    	// })
				   	 	}
					});
				}
		    else{
			console.log("Register first")
			res.send({"msg":"Register first"});
			}
		})
	}
})
}

// get user profile througt its class
module.exports.getProfile=function(req,res){    
    	User.find({"class":req.body.class},function(err,success){
		if(err){
			res.send(err)
		}
		else {
			res.send(success)
		}
	})
    }

// update user profile
 module.exports.updateProfile=function(req,res){
	User.findByIdAndUpdate({"_id":req.body._id},{$set:{"classId":req.body.classId}},function(err,success){
		if(err){
			res.send(err)
		}
		else if(success){
			res.send(success)
		}
		else{
			res.send("id not found")
			console.log("msg:id not found");
		}
	})
}


//change password 		
module.exports.changePassword=function(req,res){
	User.findOne({"emailId":req.body.emailId},function(err,success){
		if(err){
			res.send(err)
		}
		else if(success){
			generateHash1.comparePassword(req.body.password,success.password,function(err,hash){
				console.log(hash);
				if(err){
					res.send(err)
				}
				else if(hash){
					console.log(hash);
			//check success password with req password
				generateHash1.generateHash(req.body.newpassword,function(err,hash){
						console.log(err,hash);
					req.body.newpassword=hash;
				User.findOneAndUpdate({"emailId":req.body.emailId},{$set:{"password":req.body.newpassword}},function(err,success){
					if(err){
						res.send(err)
					}
					else{
						res.send(success)
					}
				})
			})		
		}
		else{
				res.send("please inter correct password")
			}	
	})
	}
	else{
				res.send("please enter correct emailId")
			}
})
}



module.exports.forgotPassword = function(req, res) {
  async.waterfall([
  	//callback(request, response, next),
    function(callback) {
      User.findOne({
        emailId: req.body.emailId
      }).exec(function(err,success) {
        if (success) {
          callback( null,success);
        } else {
          callback('User not found.');
        }
      });
    },
    function(success, callback) {
      // create the random token
      crypto.randomBytes(20, function(err, buffer) {
        var token = buffer.toString('hex');
        callback(err, success, token);
      });
    },
    function(success, token, callback) {
    // updates user object with new token and expiration date
      User.findByIdAndUpdate({ _id: success._id },{$set:{resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 }}).exec(function(err, success) {
        callback(err, token, success);
      });
    },
    function(token, success, callback) {
    	sgMail.setApiKey('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');
const msg = {
  to: 'anilyadav01.gla@gmail.com',
  from: 'test@example.com',
  subject: 'test email api',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg,function (err, info) {
   if(err){
     res.send(err)
   }
   else{
     res.send({"msg":"kindly check emailid for reset password"});
   }
});
    }
  ], function(err,success) {
	if(err){
		res.status(422).json({ message: err });
	}
	else{
		res.status(200).json({message:success});
	}
     
  });
};


module.exports.searchUserBooklist=function(req,res){
			User.findById({"_id":req.body._id},function(err,success){
				if(err){
					res.send(err);
				}
				else if(!success){ 
					res.send({"msg":"id not found"})
				}
				else{
				Book.find({"classId":success.classId},function(err,success){
						if(err){
						res.send(err)  
						}
						else{
					   res.send(success)
						}
					})	
				}
			})
		}

				

		 
