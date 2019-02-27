
var REQUESTS = [];
var LETTERS = ['s', 'm', 'e', 'n'];

function smenerate(){

  var i;


  for (i=0; i<LETTERS.length; i++){
    REQUESTS[i] = new XMLHttpRequest();
    REQUESTS[i].open('GET', "http://api.datamuse.com/words?sp="+LETTERS[i]+"*", true);
    REQUESTS[i].send();
    REQUESTS[i].addEventListener("readystatechange", handleRequests, false);
  }
}

function handleRequests(e){
  var i;
  var cur;
  for (i=0;i<4;i++){
    cur = REQUESTS[i];
    if (cur.readyState == 4 && cur.status == 200) {
          var response = JSON.parse(cur.responseText);
          console.log(response[0])
          document.getElementById(LETTERS[i]).innerHTML = response[0].word;
          REQUESTS[i].readyState = 1;
    }
  }
}

// handle clicking of enter button
document.getElementById('enter').onclick = function(){
  smenerate();
}
