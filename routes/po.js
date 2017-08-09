  var moment = require('moment');
/*
 * GET po API.
 */

exports.list = function(req, res, next) {

 // res.send('test');
  console.info('test list in po');
  req.models.Po.list(function(error, pos) {
    if (error) return next(error);
    res.send({pos: pos});
  });
  
};



/*
 * GET po List as page
 */

exports.info = function(req, res, next) {

 // res.send('test');
  console.info('test info in po');
  req.models.Po.list(function(error, pos) {
    if (error) return next(error);
    res.render('poinfo', {'pos':pos, moment: moment});
  });
  
};



/*
 * GET spo information list
 */

exports.spoinfo = function(req, res, next) {

 // res.send('test');
  console.info('test info in spoinfo');

      req.models.Po.aggregate(
        [
            {
               $group: {
                    _id: { "Spo":"$Spo", 
                           "Issueddate":"$Issueddate",
                           "Blupo":"$Blupo"
                    },
                    count: {$sum: 1}
                  }

             },
             {
                $sort: { "Issueddate": 1 ,"Spo": 1 } 
             }
        ], function (err, pos) {
            if (err) {
                next(err);
            } else {
              console.log('spoinfo：'+pos);
               console.log('spoinfo_lenth：'+pos.length);
               console.log('pos[0]._id：'+pos[0]._id);
               console.log('pos[0].count：'+pos[0].count);
               res.render('spoinfo', {'pos':pos, moment: moment});
            }
        }); 
};




/*
 * POST authenticate route.
 */

exports.searchresult = function(req, res, next) {
  if (!req.body.Lot )
    return res.render('search', {error: 'Please enter right Lot Name'});
  req.models.Pdscheduleinfo.findOne({
    Lot: req.body.Spo,
  }, function(error, po){
    if (error) return next(error);
    if (!po) return res.render('search', {error: 'Incorrect SPO'});
    res.redirect('/pos/'+po.Spo);
  })
}


/*
 * GET  all spo informaion page.
 */

exports.show = function(req, res, next) {

  if (!req.params.Spo & !req.params.Spoyear) return next(new Error('TEST    No Spo in params'));

        var Spotarget = req.params.Spo+'/'+req.params.Spoyear;
        console.log('SPO:'+Spotarget);

     req.models.Po.find({Spo: Spotarget}, function(error, pos) {

        if (error) return next(error);
   // if (!req.session.admin) return res.send(401);
           res.render('poinfo', {'pos':pos,moment: moment});
 
              });

};




exports.showblupo = function(req, res, next) {

  if (!req.params.Blupo) return next(new Error(' No Blupo in params'));

        console.log('Blupo:'+req.params.Blupo);

      req.models.Po.find({Blupo:req.params.Blupo}, function(error, pos) {

        if (error) return next(error);

        console.log('Blupo RESUT:'+pos);

   // if (!req.session.admin) return res.send(401);
           res.render('poinfo', {'pos':pos,moment: moment});
 
              });

};



/*
 * GET spo information list
 */

exports.blupoinfo = function(req, res, next) {

 // res.send('test');
  console.info('test info in blulinkpoinfo');

      req.models.Po.aggregate([
           {
            $match: { "Blupo":{ "$ne": null} }
           },
            {
               $group: {
                    _id: { "Blupo":"$Blupo", 
                           "Issueddate":"$Issueddate",
                           "Spo": "$Spo"
                    },  
                    count: {$sum: 1},
                   
                  }

            },
            {
            $sort: { "Issueddate": 1 , "Blupo" :1 } 
            }
            
        ], function (err, pos) {
            if (err) {
                next(err);
            } else {
              console.log('spoinfo：'+pos);
               console.log('spoinfo_lenth：'+pos.length);
               console.log('pos[0]._id：'+pos[0]._id);
               console.log('pos[0].count：'+pos[0].count);
               res.render('blupoinfo', {'pos':pos, moment: moment});
            }
        }); 
};



/*
 * POST authenticate route.
 */

exports.getlotfroedit = function(req, res, next) {
   if (!req.params.Lot) return next(new Error('No this lot number .'));
  req.models.Po.findOne({
    Lot: req.params.Lot
  }, function(error, po){
    if (error) return next(error);
    if (!po) return res.render('search', {error: 'Incorrect Lot'});
    res.render('poedit',{'po':po, moment: moment});
  })
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

