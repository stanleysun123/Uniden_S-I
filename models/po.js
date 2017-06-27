var mongoose = require('mongoose');


var poSchema = new mongoose.Schema({
  
  Issueddate: Date,
  Spo:String,
  Bmodel:String,
  Umodel: String,
  Div:String,
  Category:String,
  Lot: {type:String, unique: true},
  Qty: Number,
  RequestedETD:Date,
  LeadingTime: Number,
  Baanpo:String,
  Blupo:Number,
  
  Memo1:String, // GMC Status OK,Reject
  Memo2:String,  // Other memo ，for blulink invoiced/or not
  Spomemo1:String,   // other memo for SPO ex : march PO 
  // for caculat
    //SPO Sheet
  Bal: Number,
  UHFFOB: Number,
  SalesPrice: Number,
  PartsCost: Number ,
  PDCost:  Number ,
  FtyFOB: Number,
  Fcstnumber:String

});

poSchema.static({
  list: function(callback){
    this.find({}, null, {sort: {Issueddate:-1}}, callback);
  },

  spolist: function(callback){
    this.group({
     key: { Spo: 1,Issueddate:1},
     cond: { },
     reduce: function ( curr, result ) { },
     initial: { }
   } , null,  {sort: {Issueddate:-1}}, callback
   );    
 
  }

})


module.exports = mongoose.model('Po', poSchema);

