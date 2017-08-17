var apiF = false;

var el_apibox = document.getElementById("apibox");
var el_textbox = document.getElementById("textbox");
var el_arrow = document.getElementById("arrow");

document.addEventListener("click", function(e){
  var t = e.target.id;

  switch (t) {
    case "apibtn":
    case "apit":
      toggleAPI();
      break;

    case "textbox":
      el_textbox.value = "";
      break;

    case "gobutton":
    case "arrow":
      createLink();
      break;

    default:
    console.log(t);
  }
});

function toggleAPI(){
  apiF = !apiF;
  if(apiF){
    el_apibox.style.display = "block";
  } else {
    el_apibox.style.display = "none";
  }
}

function createLink(){
  var longlink = el_textbox.value;
  var validLink = true;

  el_arrow.className = "spinner";

  /*
    TODO:
      Validate the link!!
  */

  var request = new XMLHttpRequest();
  request.open("GET", "http://sl.glitch.me/get-link/" + longlink);

  request.onload = function(){
    var data = JSON.parse(request.responseText);
    console.log(data);
  };

  request.onerror = function(){
    console.log("Oups!");
  }

  request.send();
}



/*
var request = new XMLHttpRequest();
request.open('GET', '/my/url', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);
  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};




































function shorten(url){

var request = new XMLHttpRequest();
bitly="http://api.bitly.com/v3/shorten?&apiKey=mykey&login=mylogin&longURL=";
request.open('GET', bitly+url, true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
  var data = JSON.parse(request.responseText).data.url;
  alert ("1:"+data); //alerts fine from within
  // return data is helpless
  }
};

request.onerror = function() {
   // There was a connection error of some sort
   return url;
};

request.send();

}
*/
