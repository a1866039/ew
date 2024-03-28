function getDateTask4_1() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("P1").innerHTML = "This page was last viewed "+ this.responseText;
    }
  };
  xhttp.open("GET", "/last.txt", true);
  xhttp.send();
}

function getColors(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("header").innerHTML=this.responseText;
     document.getElementById("header").style.color=this.responseText;
    }
  };
  xhttp.open("GET", "/color.txt", true);
  xhttp.send();
}

var dates = [];
function log() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          dates = JSON.parse(this.responseText);
          updateDates();
          setInterval(function(){ logRo(); }, 10000);
        }
    };
    xmlhttp.open("GET", "/log.json", true);
    xmlhttp.send();
}

function logRo() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            dates = JSON.parse(this.responseText);
            updateDates();
        }
    };
    xmlhttp.open("GET", "/log-ro.json", true);
    xmlhttp.send();
}

function updateDates(){
  var ul = document.getElementsByTagName("ul")[0];
  ul.innerHTML= "";
  for (var i =0 ; i < dates.length; i++){
    let d1 = dates[i].date;
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(d1));
    ul.appendChild(li);
  }
}

function accept(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      acceptTC();
    }
  };
  xhttp.open("GET", "/accept", true);
  xhttp.send();
}

function acceptTC(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var header = document.getElementsByTagName('h1')[0];
      document.body.innerHTML = '';
      document.body.appendChild(header);
      document.body.innerHTML += this.responseText;
    }else{
      var para = document.createElement("p");
      para.innerHTML = "Accept T&C?";
      var but = document.createElement("button");
      but.onclick = function() {accept()};
      but.innerHTML = "Yes";
      header = document.getElementsByTagName('h1')[0];
      document.body.innerHTML = '';
      document.body.appendChild(header);
      document.body.appendChild(para);
      document.body.appendChild(but);
    }
  };
  xhttp.open("GET", "/content.ajax", true);
  xhttp.send();
}