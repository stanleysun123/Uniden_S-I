  var moment = require('moment');
/*
 * GET po API.
 */

exports.list = function(req, res, next) {

 // res.send('test');
  console.info('test list in po');
  req.models.Pdschedule.list(function(error, pdschedules) {
    if (error) return next(error);
    res.send({pdschedules: pdschedules});
  });
  
};


/*
 * GET pd info view.
 */

exports.info = function(req, res, next) {
 

 // res.send('test');
  console.info('test info in po');
  req.models.Pdschedule.list(function(error, pdschedules) {
    if (error) return next(error);
    res.render('pdscheduleinfo', {'pdschedules':pdschedules, moment: moment});
  });
  
};



/*
 * GET certain Lot PD & SIT info view.
 */


exports.show = function(req, res, next) {
  if (!req.params.Lot) return next(new Error('No Item Bmodel'));
  req.models.Pdschedule.find({Lot: req.params.Lot}, function(error, pdschedules) {
    if (error) return next(error);
   // if (!req.session.admin) return res.send(401);
    
    req.models.Sit.find({Lot: req.params.Lot}, function(error1, sits) {
        if (error1) return next(error1);

           res.render('pdsitinfo', {'pdschedules':pdschedules, 'sits':sits,moment: moment});
 
        });
  });
};




/*
 * GET certain Lot PD info view.
 */


exports.showcurrent = function(req, res, next) {

  req.models.Pdschedule.findOne({}, null, {sort: {Updatedate:-1}},function(error, maxdaterecord) {
    if (error) return next(error);
    console.log('Updatedate:'+maxdaterecord.Updatedate);
   // if (!req.session.admin) return res.send(401);    
    req.models.Pdschedule.find({"Updatedate":maxdaterecord.Updatedate}, function(error1, pdschedules) {
        if (error1) return next(error1);
           res.render('pdscheduleinfo', {'pdschedules':pdschedules,moment: moment});
        });

  });
};



/*
 * POST authenticate route.
 */

exports.searchresult = function(req, res, next) {

  if (!req.body.Lot)
    return res.render('search', {error: 'Please enter right Lot Name for pdscheduleinfo'});
  req.models.Pdschedule.findOne({
    Lot: req.body.Lot,
  }, function(error, pdschedule){
    if (error) return next(error);
    if (!pdschedule) return res.render('search', {error: 'Incorrect Lot for pdscheduleinfo'});
    res.redirect('/pdscheduleinfohistory/'+pdschedule.Lot);
  })
}



/*
 * GET certain Lot PD schedule history
 */


exports.showlotpdschedulehistory = function(req, res, next) {

  if (!req.params.Lot) return next(new Error('No Lot Number'));
  
  req.models.Pdschedule.find({Lot: req.params.Lot}, null, {sort: {Updatedate:-1}},function(error, pdschedules) {
   
    if (error) return next(error);
   // if (!req.session.admin) return res.send(401);
    
    req.models.Sit.find({Lot: req.params.Lot}, function(error1, sits) {
        if (error1) return next(error1);

           res.render('pdscheduleinfohistory', {'pdschedules':pdschedules, 'sits':sits,moment: moment});
 
        });
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

