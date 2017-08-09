/*
 * GET account API.
 */

var Mailgun = require('mailgun-js');



exports.info = function(req, res, next) {

 // res.send('test');
  //console.info('test list in item');
  req.models.Account.list(function(error, accounts) {
    if (error) return next(error);
    console.log("accounts"+accounts);
    res.render('account', {accounts: accounts});
  });
  
};


exports.sendemail = function(req, res, next) {

     var keyword= req.params.mail;

     console.log("keyword:", keyword);
     
     if (!req.params.mail) return next(new Error('No this Company Name.'));
           console.log("req.params.mail ", req.params.mail);
     req.models.Account.find({Company: req.params.mail},function(error, accounts) {
           if (error) return next(error);
              
                console.log("accounts ", accounts);
               
               var  received = ""; 

               for (i = 0; i < accounts.length; i++) {
                if (i== accounts.length-1 ) 
                  received += accounts[i].Email
                else
                  received += accounts[i].Email + ","
                } 

               console.log("received===="+received);

      //Your api key, from Mailgun’s Control Panel
      var api_key = 'key-f6246a55e81526724c0c2faaf8ea59c5';

     //Your domain, from the Mailgun Control Panel
       var domain = 'sandbox730ff0667e8a4f408d75da51e8d6b358.mailgun.org';

      //Your sending email address
      var from_who = 'test@email.com';


      //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
   
     var mailgun = new Mailgun({apiKey: api_key, domain: domain});

       var data = {
    //Specify email data
      from: from_who,
    //The email to contact
      to:received,
    //Subject and text data  
      subject: 'Hello from Mailgun',
      html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' + req.params.mail + '">Click here to add your email address to a mailing list</a>'
    }

    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, function (err, body) {
        //If there is an error, render the error page
        if (err) {
            res.render('error', { error : err});
            console.log("got an error: ", err);
        }
        //Else we can greet    and leave
        else {
            //Here "submitted.jade" is the view file for this landing page 
            //We pass the variable "email" from the url parameter in an object rendered by Jade
            res.render('submitted', { email : req.params.mail });
            console.log(body);
        }
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

