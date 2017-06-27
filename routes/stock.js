var moment = require('moment');

/*
 * GET stock inforamtion API.
 */

exports.list = function(req, res, next) {

 // res.send('test');
  console.info('test list in item');
  req.models.Stock.list(function(error, stocks) {
    if (error) return next(error);
    res.send({stocks: stocks});
  });
};

/*
 * GET stock infor view
 */

exports.info = function(req, res, next) {

  console.info('test show in s');

  req.models.Stock.list(function(error, stocks) {
    if (error) return next(error);

    //console.info(items.Bmodel);
    res.render('stockinfo', {stocks: stocks});
    
      });
};	



/*
 * GET item page.
 */

exports.show = function(req, res, next) {
  if (!req.params.Bmodel) return next(new Error('No Item Bmodel'));
  req.models.Stock.findOne({Bmodel: req.params.Bmodel}, function(error, stock) {
    if (error) return next(error);
   // if (!req.session.admin) return res.send(401);
    res.render('stock', stock);
  });
};



/*


exports.index = function(req, res, next){
  req.models.Article.find({published: true}, null, {sort: {_id:-1}}, function(error, articles){
    if (error) return next(error);
    res.render('index', { articles: articles});
  })
};

*/

