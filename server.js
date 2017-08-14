var express = require("express");
var mongo = require("mongodb").MongoClient;
var app = express();
var portNumber = 8000;
var dburl = "mongodb://admin:password@ds023593.mlab.com:23593/shortlink";
var database;

mongo.connect(dburl, function(err, db){
  if(err)throw err;
  database = db;

  app.listen(portNumber, function(){
    console.log("Server Started Listening on Port: " + portNumber);
  });
});

app.use(express.static(__dirname + '/public'));

app.get("/get-link/:longLink", function(req, res){
  var longLink = req.params.longLink;
  var shortLink;
  var collection = database.collection("links");

  collection.count({}, function(err, cnt){
    shortLink = "https://sl.glitch.me/" + (cnt+1).toString(36);

    var dbpac = {
      longlink: longLink,
      shortlink: shortLink
    };
    
    collection.insertOne(dbpac);
    res.status(200).send({link: shortLink});
  });
});

/*
    Visiting a link
      https://sl.glitch.me/
*/
app.get("/:shortLink", function(req, res){
  res.redirect("https://google.com");
});
