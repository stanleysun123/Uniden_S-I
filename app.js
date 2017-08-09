var TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY || 'ABC'
var TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET || 'XYZXYZ'


var moment = require('moment');

var express = require('express'),

  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  mongoose = require('mongoose'),
  models = require('./models'),
  dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/blog',
  db = mongoose.connect(dbUrl, {safe: true}),

  everyauth = require('everyauth');

var session = require('express-session'),
  logger = require('morgan'),
  errorHandler = require('errorhandler'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override');

everyauth.debug = true;
everyauth.twitter
  .consumerKey(TWITTER_CONSUMER_KEY)
  .consumerSecret(TWITTER_CONSUMER_SECRET)
  .findOrCreateUser( function (session, accessToken, accessTokenSecret, twitterUserMetadata) {
    var promise = this.Promise();
    process.nextTick(function(){
        if (twitterUserMetadata.screen_name === 'azat_co') {
          session.user = twitterUserMetadata;
          session.admin = true;
        }
        promise.fulfill(twitterUserMetadata);
    })
    return promise;
    // return twitterUserMetadata
  })
  .redirectPath('/admin');

// We need it because otherwise the session will be kept alive
everyauth.everymodule.handleLogout(routes.user.logout);


everyauth.everymodule.findUserById( function (user, callback) {
  callback(user)
});


var app = express();
app.locals.appTitle = "Uniden test";

app.use(function(req, res, next) {
  if (!models.Article || !models.User || !models.Item ) return next(new Error("No models."))
  req.models = models;
  return next();
});



// All environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser('3CCC4ACD-6ED1-4844-9217-82131BDCB239'));
app.use(session({secret: '2C44774A-D649-4D44-9535-46E296EF984F'}))
app.use(everyauth.middleware());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  if (req.session && req.session.admin)
    res.locals.admin = true;
  next();
});

// Authorization
var authorize = function(req, res, next) {
  if (req.session && req.session.admin)
    return next();
  else
    return res.send(401);
};

// Development only
if ('development' === app.get('env')) {
  app.use(errorHandler());
}


// Pages and routes
app.get('/', routes.index);
app.get('/login', routes.user.login);
app.post('/login', routes.user.authenticate);
app.get('/logout', routes.user.logout); //if you use everyauth, this /logout route is overwriting by everyauth automatically, therefore we use custom/additional handleLogout

app.get('/post', authorize, routes.article.post);
app.post('/post', authorize, routes.article.postArticle);
app.get('/articles/:slug', routes.article.show);

app.get('/admin', authorize, routes.item.admin);



//L1 information
app.get('/itemlist', routes.item.showlist);
app.get('/items/:Bmodel', routes.item.show);
app.get('/iteminfo', routes.item.info);
app.get('/stockinfo', routes.stock.info);
app.get('/poinfo',routes.po.info);
app.get('/pdscheduleinfo',routes.pdschedule.info)
app.get('/sitinfo',routes.sit.info);

//L2 information
app.get('/stockhisinfo', routes.stockhistory.info);
app.get('/lotinfo',routes.lot.info);
app.get('/pd/:Lot', routes.pdschedule.show);
app.get('/pdscheduleinfocurrent',routes.pdschedule.showcurrent);


app.get('/search', routes.item.search);


app.post('/search', routes.item.searchresult);

app.post('/searchspo', routes.po.searchresult);

app.post('/searchpdschedule', routes.pdschedule.searchresult);

//app.post('/searchaccount', routes.account.searchresult));

app.get('/pdscheduleinfohistory/:Lot', routes.pdschedule.showlotpdschedulehistory);

app.get('/spoinfo',routes.po.spoinfo);
app.get('/pos/:Spo/:Spoyear', routes.po.show);

app.get('/blu/:Blupo', routes.po.showblupo);
app.get('/blupoinfo',routes.po.blupoinfo);


// REST API routes
app.all('/api', authorize);
app.get('/api/articles', routes.article.list);
app.post('/api/articles', routes.article.add);
app.put('/api/articles/:id', routes.article.edit);
app.del('/api/articles/:id', routes.article.del);

app.get('/api/itemlist', routes.item.list);
app.get('/api-stocklist', routes.stock.list);
app.get('/api-polist',routes.po.list);
app.get('/api-pdscheduleinfo',routes.pdschedule.list);
app.get('/api-sitinfo',routes.sit.list);
app.get('/api-stockhislist', routes.stockhistory.list);

app.put('/api/models/:Bmodel', routes.item.edit);

//Sale Part 

app.get('/api-salercordinfo',routes.salerecord.list);
app.get('/sales/:Bmodel', routes.salerecord.show);

//PO Edit
app.get('/edit/pos/:Lot', routes.po.getlotfroedit);
//app.put('/edit/pos/:Lot', routes.po.edit);


// Lots
app.get('/api-lot',routes.lot.list);


// Email funcation
app.get('/testEmail',routes.account.info);

app.get('/submit/:mail',routes.account.sendemail)


app.all('*', function(req, res) {
  res.send(404);
})

// http.createServer(app).listen(app.get('port'), function(){
  // console.log('Express server listening on port ' + app.get('port'));
// });

var server = http.createServer(app);
var boot = function () {
  server.listen(app.get('port'), function(){
    console.info('Express server listening on port ' + app.get('port'));
  });
}
var shutdown = function() {
  server.close();
}
if (require.main === module) {
  boot();
} else {
  console.info('Running app as a module')
  exports.boot = boot;
  exports.shutdown = shutdown;
  exports.port = app.get('port');
}
