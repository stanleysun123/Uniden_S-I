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

var lotSchema = new mongoose.Schema({
  
  Issueddate:String,
  Lot:String,
  From:String,
  Bmodel:String,
  Umodel:String,
  To: String,
  ETD: Date,
  ETA: Date,
  Qty: Number,
  LatestPD: Date,
  Sit:[sitSchema]
});


lotSchema.static({
  list: function(callback){
    this.findOne({Bmodel:"SSE35+1WH",Lot:"VC9887"}, null, {sort: {_id:-1}}, callback);
      console.info(this);
 }

})



module.exports = mongoose.model('Lot', lotSchema);

