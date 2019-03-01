
var LETTERS = ['s', 'm', 'e', 'n'];
var SMENSTART = ["<span class='first-letter'>S</span>",
                "<span class='first-letter'>M</span>",
                "<span class='first-letter'>E</span>",
                "<span class='first-letter'>N</span>"]

function smenerate(){
  DONE = [0, 0, 0, 0]
  var i;
  for (i=0; i<LETTERS.length; i++){
    // add 'ends in' to query (removing non-alphabetic)
    var ends_in = document.getElementById(LETTERS[i]+'-end').value.replace(/\W/g, '')
    var url = "https://api.datamuse.com/words?sp="+LETTERS[i]+"*"+ends_in+"&md=[p]&max=1000"
    console.log(url)
    console.log(window.location.href)
    // perform request
    $.ajax({
      url: url,
      type: 'GET',
      crossDomain: true,
      // dataType: 'jsonp',
      // jsonpCallback: 'handleRequests',
      // dataType: 'html',
      success: handleRequests,
      error: function(e, f,g) {
                              console.log(e);
                              console.log(f);
                              console.log(g);},
      // beforeSend: setHeader
    });
    // $.get(url, handleRequests);
  }
}

function handleRequests(response){
  console.log(response)
  var i; // iterator index
  var pos; // part of speech

  // get first letter
  var letter = response[0].word[0]

  pos = document.getElementById(letter+'-pos').value
  var randObj = response[Math.floor(Math.random() * response.length)]
  var tries = 1;
  while (tries < 1000 && pos != 'NA' && randObj.tags && !randObj.tags.includes(pos)){
    randObj = response[Math.floor(Math.random() * response.length)]
    tries++;
  }
  document.getElementById(letter).innerHTML = SMENSTART[LETTERS.indexOf(letter)] + randObj.word.substring(1);
}

// handle clicking of enter button
document.getElementById('enter').onclick = function(){
  smenerate();
}
