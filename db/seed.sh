mongoimport --db blog --collection users --file ./db/users.json --jsonArray

mongoimport --db blog --collection articles --file ./db/articles.json --jsonArray

mongoimport --db blog --collection items --file ./items_live.json --jsonArray

mongoimport --db blog --collection stocks --file ./stock_live.json --jsonArray

mongoimport --db blog --collection pos --file ./po_test.json --jsonArray


 db.stocks.aggregate([{$group : {_id : "$Bmodel", num_tutorial : {$sum : $}}}])
 
 
 db.stocks.aggregate([{$group : {_id : "$Bmodel", total_num : {$sum : "$Qty"}}}])
 
 
 db.stocks.aggregate([{$group : {_id : "$Bmodel",total_num : {$sum : "$Qty"}}}])
 
 
 db.stocks.find({Bmodel : "GDCH10" })
 
 mongoimport --db blog --collection pdschedules --file ./pdschedule/file.json --jsonArray
 
 
mongoimport --db blog --collection sits --file ./sit.json --jsonArray


mongoimport --db blog --collection stockhistories --file ./stockhis_live.json --jsonArray


mongoimport --db blog --collection salerecords --file ./sales/salerecords.json --jsonArray
