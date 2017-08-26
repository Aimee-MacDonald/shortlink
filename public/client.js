var el_textbox = document.getElementById("textbox");
var el_arrow = document.getElementById("arrow");
var el_apibox = document.getElementById("apibox");

var apiFlag = false;

// When the Window is Loaded
window.onload = function(){
  console.log("Hi");
  // Handle form Submit
  document.getElementById("urlwidget").onsubmit = function(){
    var longlink = el_textbox.value;
    
    el_arrow.className = "spinner";
    
    var request = new XMLHttpRequest();
    request.open("GET", "https://sl.glitch.me/get-link?longlink=" + longlink);
    
    request.onload = function(){
      var data = JSON.parse(request.responseText);
      el_textbox.value = data.link;
      el_arrow.className = "arrow";
    };
    
    request.onerror = function(){
      el_textbox.value = "Oups!";
      el_arrow.className = "arrow";
    };
    
    request.send();
    
    return false;
  };
};

document.addEventListener("click", function(e){
  switch(e.target.id){
    case "apibtn":
    case "apit":
      toggleAPI();
      break;
      
    case "textbox":
      if(el_textbox.value === "Shorten any Link!")el_textbox.value = "";
  }
});

function toggleAPI(){
  apiFlag = !apiFlag;
  if(apiFlag){
    el_apibox.style.display = "block";
  } else {
    el_apibox.style.display = "none";
  }
}