var express = require("express");
var app = express();
var portNumber = 8000;

app.use(express.static(__dirname + '/public'));

app.get("/get-link/:longLink", function(req, res){
  var longLink = req.params.longLink;


  var shortLink = 30;
  shortLink++;
  shortLink = shortLink.toString(36);
  shortLink = "https://sl.glitch.me/" + shortLink;
  /*
      l = number of entries in db + 1
      Convert l to base36
      parseInt(string, radix)
      NumberObject.toString(radix)
  */

  /*
      Generate Short link
        Count the number of Links in the Database
        Convert the number to base36
        Create the link
          https://sl.glitch.me/<base36 number>
      Store Both Links
      Return Short Link
  */
  res.status(200).send({link: shortLink});
});

/*
    Visiting a link
      https://sl.glitch.me/
*/
app.get("/:shortLink", function(req, res){
  res.redirect("https://google.com");
});

app.listen(portNumber, function(){
  console.log("Server Started Listening on Port: " + portNumber);
});
