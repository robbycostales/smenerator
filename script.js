
var REQUESTS = [];
var LETTERS = ['s', 'm', 'e', 'n'];
var SMENSTART = ["<span class='first-letter'>S</span>",
                "<span class='first-letter'>M</span>",
                "<span class='first-letter'>E</span>",
                "<span class='first-letter'>N</span>"]
var DONE = [1, 1, 1, 1];

function smenerate(){
  DONE = [0, 0, 0, 0]
  var i;
  for (i=0; i<LETTERS.length; i++){
    // add 'ends in' to query (removing non-alphabetic)
    var ends_in = document.getElementById(LETTERS[i]+'-end').value.replace(/\W/g, '')

    // perform request
    REQUESTS[i] = new XMLHttpRequest();
    REQUESTS[i].open('GET', "http://api.datamuse.com/words?sp="+LETTERS[i]+"*"+ends_in+"&md=[p]&max=1000", true);
    REQUESTS[i].send();
    REQUESTS[i].addEventListener("readystatechange", handleRequests, false);
  }
}

function handleRequests(e){
  var i; // iterator index
  var cur; // cur request
  var pos; // part of speech
  for (i=0;i<4;i++){

    cur = REQUESTS[i];
    if (DONE[i] == 0 && cur.readyState == 4 && cur.status == 200) {
          // get part of speech for specific letter in SMEN
          pos = document.getElementById(LETTERS[i]+'-pos').value
          // parse response
          var response = JSON.parse(cur.responseText);
          // gather random word object
          var randObj = response[Math.floor(Math.random() * response.length)]
          console.log(randObj)
          // skip while loop if NA, keep going if tag does not include desired part of speech. stop if too many tries
          var tries = 1;
          while (tries < 1000 && pos != 'NA' && randObj.tags && !randObj.tags.includes(pos)){
            randObj = response[Math.floor(Math.random() * response.length)]
            tries++;
          }
          // set inner html for letter to chosen random word
          // SMENSTART makes first letter uppercase and bold
          document.getElementById(LETTERS[i]).innerHTML = SMENSTART[i] + randObj.word.substring(1);
          // turn off readyState
          DONE[i] = 1
    }
  }
}

// handle clicking of enter button
document.getElementById('enter').onclick = function(){
  smenerate();
}
