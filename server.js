var express = require("express");
var app = express();
var portNumber = 8000;

app.use(express.static(__dirname + '/public'));

app.listen(portNumber, function(){
  console.log("Server Started Listening on Port: " + portNumber);
});
