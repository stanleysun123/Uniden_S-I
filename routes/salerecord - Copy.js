var moment = require('moment');

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
var CurrentMonth = Currentdate.getMonth()+1;
var CurretnYear = moment(Currentdate).format('YYYY');

var Previous2Month = CurrentMonth-2;
var PreviousMonth = CurrentMonth-1;
var NextMonth = CurrentMonth+1;
var Next2Month = CurrentMonth+2;
var Next3Month = CurrentMonth+3;
var Next4Month = CurrentMonth+4;
var Next5Month = CurrentMonth+5;
var Next6Month = CurrentMonth+6;

var MonthArr = [Previous2Month, PreviousMonth, CurrentMonth, NextMonth, Next2Month, Next3Month, Next4Month, Next5Month,Next6Month];


var SaleRecord;
var Previous2Monthsalerecord;
var PreviousMonthsalerecord;
var CurrentMonthsalerecord;
var SalesArr = [];
var SalesFcstArr = [];

exports.show = function(req, res, next) {
  


  if (!req.params.Bmodel) return next(new Error('No Item Bmodel'));

  for (i = 0; i < MonthArr.length; i++) {   

    console.log('CurrentMonth'+MonthArr[i]);
    console.log('CurretnYear:'+CurretnYear);

    req.models.Salerecord.findOne({Bmodel: req.params.Bmodel, Year:CurretnYear,Month:MonthArr[i]}, function(error, salerecord) {   

     if (error) return next(error);
     console.log(salerecord);

     if (!salerecord) { SalesArr[i]=0;  console.log('SalesArr:'+i+':'+SalesArr[i]);}
     else {
    SalesArr[i]=salerecord.Totalqty;
      console.log('SalesArr:'+i+':'+SalesArr[i]);
        }

      }); 
  
  };


  for (i = 0; i < MonthArr.length; i++) {   

    console.log('CurrentMonth'+MonthArr[i]);
    console.log('CurretnYear:'+CurretnYear);

    req.models.Salerefcst.findOne({Bmodel: req.params.Bmodel, Year:CurretnYear,Month:MonthArr[i]}, function(error, salerecord) {   

     if (error) return next(error);
     console.log(salerecord);

     if (!salerecord) { SalesFcstArr[i]=0;  console.log('SalesFcstArr:'+i+':'+SalesFcstArr[i]);}
     else {
      SalesFcstArr[i]=salerecord.Totalqty;
      console.log('SalesFcstArr:'+i+':'+SalesFcstArr[i]);
        }

      }); 

    };

      console.log('SalesArrTotal:'+SalesArr);
      console.log('SalesFcstArrTotal:'+SalesFcstArr);

    //res.render('sale', {'MonthArr':MonthArr,'SalesArr':SalesArr, 'SalesFcstArr':SalesFcstArr,moment: moment});




  }




  




/*


exports.index = function(req, res, next){
  req.models.Article.find({published: true}, null, {sort: {_id:-1}}, function(error, articles){
    if (error) return next(error);
    res.render('index', { articles: articles});
  })
};

*/

