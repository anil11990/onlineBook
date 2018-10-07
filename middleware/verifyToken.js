var jwt = require('jsonwebtoken');

module.exports.userToken=function(req,res,next){
  if(!req.headers.hasOwnProperty("token")){
    res.send("token required");
  }
  else{
    jwt.verify(req.headers.token,"asdf",function(err,token){
  if(err){
    res.send(err)
  }
  else{
    // res.send(token)
    next()   
  }
})
}
}