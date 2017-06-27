var mongoose = require('mongoose');


var pdscheduleSchema = new mongoose.Schema({
  
  Updatedate: Date,
  Bmodel:String,
  Umodel: String,
  Div:String,
  Lot: String,
  Size: Number ,
  Bal: Number ,
  Start:Date,
  End:Date,
  Import:String,
  Memo:String
});

pdscheduleSchema.static({
  
  list: function(callback){
    this.find({}, null, {sort: {_id:-1}}, callback);
  }
}
)

module.exports = mongoose.model('Pdschedule', pdscheduleSchema);

  