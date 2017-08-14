var express = require("express");
var mongo = require("mongodb").MongoClient;
var app = express();
var portNumber = 8000;
var dburl = "mongodb://admin:password@ds023593.mlab.com:23593/shortlink";

app.use(express.static(__dirname + '/public'));

app.get("/get-link/:longLink", function(req, res){
  var longLink = req.params.longLink;

  mongo.connect(dburl, function(err, db){
    if(err)throw err;
    db.collection("links").count({}, function(err, cnt){
      if(err)throw err;
      shortLink = "https://sl.glitch.me/" + (cnt+1).toString(36);
      res.status(200).send({link: shortLink});
      storeLink(longLink, shortLink);
    });
    db.close();
  });
});

/*
    Visiting a link
      https://sl.glitch.me/
*/
app.get("/:shortLink", function(req, res){
  res.redirect("https://google.com");
});

function storeLink(ll, sl){
  var l = {
    longlink: ll,
    shortlink: sl
  }
  console.log(l);
}

app.listen(portNumber, function(){
  console.log("Server Started Listening on Port: " + portNumber);
});
