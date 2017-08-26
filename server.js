// Preprocessing
var express = require("express");
var app = express();
var mongo = require("mongodb").MongoClient;

// Global Vars
var portNumber = 8000;
var dburl = "mongodb://admin:password@ds023593.mlab.com:23593/shortlink";
var database;

// Connect to Database
mongo.connect(dburl, function(err, db){
  if(err)throw err;
  database = db;
  
  // Start Listening
  app.listen(portNumber, function(){
    console.log("Server is Listening on Port: " + portNumber);
  });
});

// Serve Home Page
app.use(express.static(__dirname + '/public'));

// Shortens a Link
app.get("/get-link", function(req, res){
  var longlink = req.query.longlink;
  var shortlink;
  
  if(validate(longlink)){
    var collection = database.collection("links");
    
    console.log(longlink + " is a Valid Link.");
    
    collection.find({
      longlink: longlink,
    }).toArray(function(err, d){
      if(err)throw err;
      
      // If this link Already Exists in the db
      if(d.length > 0){
        res.status(200).send({"link": d[0].shortlink});
      } else {
        collection.count({}, function(err, cnt){
          shortlink = "https://sl.glitch.me/" + (cnt+1).toString(36);
          var dbpac = {
            "longlink": longlink,
            "shortlink": shortlink
          };
          collection.insertOne(dbpac);
          res.status(200).send({"link": shortlink});
        });
      }
    });
  } else {
    res.status(400).send({"link": "Error: Invalid Link"});
  }
});

// Redirects a Shortened Link
app.get("/:shortlink", function(req, res){
  var collection = database.collection("links");
  var shortlink = "https://sl.glitch.me/" + req.params.shortlink;
  
  collection.find({
    "shortlink": shortlink,
  }).toArray(function(err, d){
    if(err)throw err;
    res.redirect(d[0].longlink)
  });
});

// Validates a long link for Shortening
function validate(link){
  link = link.split(".");
  
  if(link.length < 2 || link.length > 3) return false;
  
  if(link[0] === "http://" || link[0] === "https://" || link[0] === "http://www" || link[0] === "https://www"){
    if(link.length === 2)return false;
  }
    
  return true;
}
