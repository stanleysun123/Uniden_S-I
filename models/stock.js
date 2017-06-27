var mongoose = require('mongoose');


var stockSchema = new mongoose.Schema({
  
  Bmodel:String,
  Description:String,
  Qty:Number,
  Warehouse:Number,
  WarehouseName:String,
  Update:Date

});

  stockSchema.static({
  list: function(callback){
    this.find({}, null, {sort: {_id:-1}}, callback);
  }
})



module.exports = mongoose.model('Stock', stockSchema);

