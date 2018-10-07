var bcrypt = require('bcryptjs');

module.exports.generateHash= function(password,callback){
	   bcrypt.hash(password, 10, function(err, hash) {
    // Store hash in your password DB.
            callback(err, hash);
       });
	}
//to compare password that user supplies in the future
module.exports.comparePassword=function(password,hashPassword,callback){
	 bcrypt.compare(password, hashPassword, function(err, hash) {
    if (err) callback(err,null);
    else callback(null,hash);
  });
}