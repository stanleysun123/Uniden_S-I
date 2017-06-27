var mongoose = require('mongoose');


var salefcstSchema = new mongoose.Schema({
  
  Bmodel:String,
  Totalqty:Number,
  Year:  Number,
  Month: Number,
  Day: Number,

  Customerfcst :{
      Customer:String,
      Qty:Number,
      },     

  Update:Date,
  
});

  salefcstSchema.static({
  list: function(callback){
    this.find({}, null, {sort: {_id:-1}}, callback);
  }
})



module.exports = mongoose.model('Salefcst', salefcstSchema);

