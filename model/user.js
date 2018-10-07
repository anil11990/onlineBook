var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var userSchema=new Schema({
name: {
    type: String,
    required: [true,'user name is required'],
    // validate:{
    // 	validator: function(name){
    // 		return /^[a-z0-9]{3,20}$/.test(name);
    //         },
    //      message: '{VALUE} is not a valid name!'
    // },
  },	
phoneNumber: {
        type: String,
        required: [true, 'User phone number required'],
        validate: {
            validator: function(number) {
                return /^[0-9]{10}$/.test(number);
            },
         message: '{VALUE} is not a valid phone number!'
       },   
    },

emailId:{
		type:String,
		required: [true,'emailId is required'],
		unique:true,
		validate: {
            validator: function(emailId) {
                return /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]/igm.test(emailId);
            },
         message: '{VALUE} is not a valid emailid!'
       }, 
	},

password:{
		type:String,
		required:true,
		// validate:{
  //   	validator: function(password){
  //   //8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
  //   		return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password);
  //           },
  //        message: '{VALUE} is not a valid password!'
  //   	},
	},
  resetPasswordToken:{
    type:String
  },
  resetPasswordExpires:{
    type:Date
  },

classId:{
		type:String,
		required:true
	},
address:{
		type:String
	}
})



module.exports = mongoose.model('User', userSchema);

