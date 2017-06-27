var mongoose = require('mongoose');


var stockhistorySchema = new mongoose.Schema({
  
  Bmodel:String,
  Description:String,
  Qty:Number,
  Warehouse:Number,
  WarehouseName:String,
  Update:Date

});

  stockhistorySchema.static({
  list: function(callback){
    this.find({}, null, {sort: {_id:-1}}, callback);
   console.info(this);

  }
})



module.exports = mongoose.model('Stockhistory', stockhistorySchema);

