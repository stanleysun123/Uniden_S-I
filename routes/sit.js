var moment = require('moment');
/*
 * GET po API.
 */

exports.list = function(req, res, next) {

 // res.send('test');
  console.info('test list in po');
  req.models.Sit.list(function(error, sits) {
    if (error) return next(error);
    res.send({sits: sits});
  });
  
};



/*
 * GET pd info view.
 */

exports.info = function(req, res, next) {

 // res.send('test');
  console.info('test info in po');
  req.models.Sit.list(function(error, sits) {
    if (error) return next(error);
    res.render('sitinfo', {'sits':sits, moment: moment});
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

