var mongoose = require('mongoose');
var Schema = mongoose.Schema;
   
var classSchema = new Schema({
	class:{
		type:String
	},
	status: {
            type: Number,
            default: 1 // status 1 is Active and 0 is inActive/delete
        }

});
module.exports = mongoose.model('Class', classSchema);