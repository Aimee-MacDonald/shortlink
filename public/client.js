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

  if(longlink.slice(0, 7) === "http://")longlink = longlink.slice(7, longlink.length);
  if(longlink.slice(0, 8) === "https://")longlink = longlink.slice(8, longlink.length);

  el_arrow.className = "spinner";

  // Sending the Request
  var request = new XMLHttpRequest();
  request.open("GET", "https://sl.glitch.me/get-link/" + longlink);

  request.onload = function(){
    var data = JSON.parse(request.responseText);
    el_textbox.value = data.link;
    el_arrow.className = "arrow";
  };

  request.onerror = function(){
    console.log("Oups!");
    el_arrow.className = "arrow";
  };

  request.send();
}
