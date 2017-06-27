var moment = require('moment');

/*
 * GET stock history inforamtion API.
 */

exports.list = function(req, res, next) {

 // res.send('test');
  console.info('test list in stockhis');
  req.models.Stockhistory.list(function(error, stockhiss) {
    if (error) return next(error);
    res.send({stockhiss: stockhiss});
  });
};

/*
 * GET stock infor view
 */

exports.info = function(req, res, next) {

  console.info('test show in stockhis');

  req.models.Stockhistory.list(function(error, stockhistories) {
    if (error) return next(error);

    //console.info(items.Bmodel);
    res.render('stockhisinfo', {'stockhistories': stockhistories,moment: moment});
    
      });
};	



/*
 * GET item page.
 */

exports.show = function(req, res, next) {
  if (!req.params.Bmodel) return next(new Error('No Item Bmodel'));
  req.models.Stockhistory.findOne({Bmodel: req.params.Bmodel}, function(error, stock) {
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

