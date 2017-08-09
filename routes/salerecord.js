var moment = require('moment');
var numeral = require('numeral');

/*
 * GET stock inforamtion API.
 */

exports.list = function(req, res, next) {

 // res.send('test');
  console.info('test list in item');

  req.models.Salerecord.list(function(error, salesrcords) {
    if (error) return next(error);
    res.send({salesrcords: salesrcords});
  });

};

/*
 * GET stock infor view
 */

exports.info = function(req, res, next) {

  console.info('test show in s');

  req.models.Stock.list(function(error, salesrcords) {
    if (error) return next(error);

    //console.info(items.Bmodel);
    res.render('stockinfo', {salesrcords: salesrcords});
    
      });
};  



/*
 * GET item page.
 */

exports.show = function(req, res, next) {
 
 if (!req.params.Bmodel) return next(new Error('No Item Bmodel'));

  req.models.Stock.c({Bmodel: req.params.Bmodel}, function(error, stock) {
    if (error) return next(error);
   // if (!req.session.admin) return res.send(401);
    res.render('stock', stock);
  });
};


/*
 * GET item all informaion page.
 */


var Currentdate = new Date();
var CurrentMonth = parseInt(Currentdate.getMonth()+1);
var CurretnYear = parseInt(moment(Currentdate).format('YYYY'));

var Previous2Month = parseInt(CurrentMonth-2);
var PreviousMonth =  parseInt(CurrentMonth-1);
var NextMonth = parseInt(CurrentMonth+1);
var Next2Month = parseInt(CurrentMonth+2);
var Next3Month = parseInt(CurrentMonth+3);
var Next4Month = parseInt(CurrentMonth+4);
var Next5Month = parseInt(CurrentMonth+5);
var Next6Month = parseInt(CurrentMonth+7);
var Next7Month = parseInt(CurrentMonth+8);

var MonthArr = [Previous2Month, PreviousMonth, CurrentMonth, NextMonth, Next2Month, Next3Month, Next4Month, Next5Month,Next6Month,Next7Month];


var SaleRecord;
var Previous2Monthsalerecord;
var PreviousMonthsalerecord;
var CurrentMonthsalerecord;
var SalesArr = [];
var SalesFcstArr = [];

exports.show = function(req, res, next) {
  


  if (!req.params.Bmodel) return next(new Error('No Item Bmodel'));

  

    console.log('CurrentMonth:'+CurrentMonth);
    console.log('CurretnYear:'+CurretnYear);

    req.models.Salerecord.find({Bmodel: req.params.Bmodel, Year:CurretnYear,Month:{$gte:Previous2Month}}, function(error, salerecords) {   

     if (error) return next(error);
     console.log('salerecords:'+salerecords);

      req.models.Salefcst.find({Bmodel: req.params.Bmodel, Year:CurretnYear,Month:{$gte:Previous2Month}}, function(error, salerefcsts) {   

       if (error) return next(error);
         
          console.log(salerefcsts);
          console.log('Currentdate:'+Currentdate);
          
          req.models.Po.find({Bmodel: req.params.Bmodel, RequestedETD:{$gte:Currentdate}}, function(error, pos) {   
              
              if (error) return next(error); 
               console.log('pos:'+pos);

              res.render('sale', {'MonthArr':MonthArr,'salerecords':salerecords, 'salerefcsts':salerefcsts,moment: moment,numeral:numeral});
  

              });
       
     }); 


    }); 

  }




  




/*


exports.index = function(req, res, next){
  req.models.Article.find({published: true}, null, {sort: {_id:-1}}, function(error, articles){
    if (error) return next(error);
    res.render('index', { articles: articles});
  })
};

*/

