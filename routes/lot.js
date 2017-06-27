var moment = require('moment');
/*
 * GET po API.
 */

exports.list = function(req, res, next) {

 // res.send('test');
  console.info('test list in po');
  req.models.Lot.list(function(error, lots) {
    if (error) return next(error);
    console.log('lot:'+lots);
    res.send({lots: lots});
  });
  
};



/*
 * GET po API.
 */

exports.info = function(req, res, next) {

 // res.send('test');
  console.info('test info in lots');
  req.models.Lot.find(function(error, lots) {
    if (error) return next(error);
       console.info('Lotaaaa: ' + lots[0])
       console.info('LotQty: ' + lots[0].Sit[0].Qty)
    res.render('lotinfo', {'lots':lots, moment: moment});
  });
  
};


/*
/*
 * GET items list page.


exports.showlist = function(req, res, next) {

  console.info('test show in item');

  req.models.Item.list(function(error, items) {
    if (error) return next(error);

    console.info(items.Bmodel);
    res.render('itemlist', {items: items});
    
      });
};	



/*
 * GET item page.


exports.show = function(req, res, next) {
  if (!req.params.Bmodel) return next(new Error('No Item Bmodel'));
  req.models.Item.findOne({Bmodel: req.params.Bmodel}, function(error, item) {
    if (error) return next(error);
   // if (!req.session.admin) return res.send(401);
    res.render('item', item);
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

