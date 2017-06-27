var mongoose = require('mongoose');


var salerecordSchema = new mongoose.Schema({
  
  Bmodel:String,
  Totalqty:Number,
  Update:Date,
  Year:  Number,
  Month: Number,
  Day: Number,
  SaleDate:Date

});

  salerecordSchema.static({

  list: function(callback){
    this.find({}, null, {sort: {_id:-1}}, callback);
    console.info(this);
  }



})



module.exports = mongoose.model('Salerecord', salerecordSchema);

