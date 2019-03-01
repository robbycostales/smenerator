
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
  var i; // iterator index
  var pos; // part of speech
  var letter;

  // get first letter
  try {
    letter = response[0].word[0]
  } catch(error){
    console.log("no first letter of first word...")
    console.log(error)
    return
  }

  console.log(String(letter) + " has " + String(response.length) + " responses ")

  pos = document.getElementById(letter+'-pos').value
  // true or false, if we want to keep this value, return if so
  var keep=$("#"+letter+'-keep').is(":checked");
  if (keep){
    return
  }

  // fetch random object from response vector
  randObj = response[Math.floor(Math.random() * response.length)]

  // see if we need to try a new word
  var tries = 0;
  var randObj;
  // if we've tried more times than length of list
  // ... or, we don't care about tags at all, we peace out
  console.log(letter+'  leading into while loop')
  while (tries < 1000 && pos != 'NA'){
    tries +=1;
    console.log(tries)

    // if tags undefined
    if (!randObj.tags){
      continue
    }

    // see if object has POS tag we are looking for
    if (randObj.tags.includes(pos)){
      break
    }

    // get new value
    randObj = response[Math.floor(Math.random() * response.length)]
    // increment tries, you dummy!
  }

  // set HTML of corresponding letter to new word generated
  document.getElementById(letter).innerHTML = SMENSTART[LETTERS.indexOf(letter)] + randObj.word.substring(1);
  console.log(letter+ "  set")
}

// handle clicking of enter button
document.getElementById('enter').onclick = function(){
  smenerate();
}
