var mongoose = require('mongoose');


var itemSchema = new mongoose.Schema({
  
  Bmodel:String,
  Umodel:String,
  SalesPrice: Number,
  UHFFOB: Number,
  PartsCost: Number ,
  PDCost:  Number ,
  FtyFOB: Number,
  published: {
    type: Boolean,
    default: false
  }
});

itemSchema.static({
  list: function(callback){
    this.find({}, null, {sort: {_id:-1}}, callback);
  }

})



module.exports = mongoose.model('Item', itemSchema);

