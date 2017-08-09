var mongoose = require('mongoose');


var accountSchema = new mongoose.Schema({
  
  Name:String,
  Company:String,
  Email:String,

});

  accountSchema.static({
  list: function(callback){
    this.find({}, null, {sort: {_id:-1}}, callback);
  }
})



module.exports = mongoose.model('Account', accountSchema);

