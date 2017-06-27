var moment = require('moment');

/*
 * GET items API.
 */

exports.list = function(req, res, next) {

 // res.send('test');
  console.info('test list in item');
  req.models.Item.list(function(error, items) {
    if (error) return next(error);
    res.send({items: items});
  });
  
};



/*
 * GET items API.
 */

exports.info = function(req, res, next) {

 // res.send('test');
  //console.info('test list in item');
  req.models.Item.list(function(error, items) {
    if (error) return next(error);
    res.render('iteminfo', {items: items});
  });
  
};



/*
 * GET items list page.
 */

exports.showlist = function(req, res, next) {

  console.info('test show in item');

  req.models.Item.list(function(error, items) {
    if (error) return next(error);

    console.info(items.Bmodel);
    res.render('itemlist', {items: items});
    
      });
};	



/*
 * GET item all informaion page.
 */

exports.show = function(req, res, next) {
  if (!req.params.Bmodel) return next(new Error('No Item Bmodel'));
  req.models.Item.findOne({Bmodel: req.params.Bmodel}, function(error, item) {
    if (error) return next(error);
   // if (!req.session.admin) return res.send(401);
    
    req.models.Stock.find({Bmodel: req.params.Bmodel}, function(error1, stocks) {
        if (error1) return next(error1);
       
       req.models.Po.find({Bmodel: req.params.Bmodel}, function(error2, pos) {
            if (error2) return next(error2);

           res.render('item', {item, 'stocks':stocks, 'pos':pos,moment: moment});
 
              });

        });

  });
};

/*
 * PUT Item API.
 */ 

exports.edit = function(req, res, next) {
  if (!req.params.Bmodel) return next(new Error('No Item Name.'));
  req.models.Item.findOne({Bmodel: req.params.Bmodel}, function(error, item) {
    if (error) return next(error);
    item.update({$set: req.body.item}, function(error, count, raw){
      if (error) return next(error);
      res.send({affectedCount: count});
    })
  });
};


/*
 * GET admin page.
 */

exports.admin = function(req, res, next) {
  req.models.Item.list(function(error, items) {
    if (error) return next(error);
    res.render('admin',{items:items});
  });

};


exports.search = function(req, res, next) {
  req.models.Item.list(function(error, items) {
    if (error) return next(error);
    res.render('search',{items:items});
  });

};


/*
 * POST authenticate route.
 */

exports.searchresult = function(req, res, next) {
  if (!req.body.Bmodel )
    return res.render('search', {error: 'Please enter right Bmodel Name'});
  req.models.Item.findOne({
    Bmodel: req.body.Bmodel,
  }, function(error, item){
    if (error) return next(error);
    if (!item) return res.render('search', {error: 'Incorrect Bmodel'});
    res.redirect('/items/'+item.Bmodel);
  })
}




/*


exports.index = function(req, res, next){
  req.models.Article.find({published: true}, null, {sort: {_id:-1}}, function(error, articles){
    if (error) return next(error);
    res.render('index', { articles: articles});
  })
};

*/

