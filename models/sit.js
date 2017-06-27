var mongoose = require('mongoose');


var sitSchema = new mongoose.Schema({

  Invoice:String,
  To:String,
  Lot: String,
  Model: String,
  Bmodel: String ,
  Pono:  String ,
  Qty: Number,
  Etd: Date,
  Eta: Date,
  Wh: Date,
  Memo: String

});

sitSchema.static({
  list: function(callback){
    this.find({}, null, {sort: {_id:-1}}, callback);
  }
})


module.exports = mongoose.model('Sit', sitSchema);

