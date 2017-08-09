exports.article = require('./article');
exports.user = require('./user');
exports.item = require('./item');
exports.stock = require('./stock');
exports.po = require('./po');
exports.lot = require('./lot');
exports.pdschedule = require('./pdschedule');
exports.sit = require('./sit');
exports.stockhistory = require('./stockhistory');
exports.salerecord = require('./salerecord');
exports.account = require('./account');

/*
 * GET home page.
 */

exports.index = function(req, res, next){
  req.models.Item.find({published: true}, null, {sort: {_id:-1}}, function(error, items){
    if (error) return next(error);
    res.render('index', { items: items});
  })
};



