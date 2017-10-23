var KEY_CODE_A = 97;
var FADE_INTERVAL = 1050;

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function getRandomIntInclusive(min, max){
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

var currentIndex = 0;

function getNextTip(){

   var result = TIPS[currentIndex];

   currentIndex += 1;

   if(currentIndex >= TIPS.length) {
      shuffleArray(TIPS)
      currentIndex = 0;
   }

   return result;
}

function showNextTip(){
   var tip = getNextTip();

   document.getElementsByClassName('tip-title')[0].style.opacity = 0;
   document.getElementsByClassName('tip-content')[0].style.opacity = 0;
   document.getElementsByClassName('tip-comment')[0].style.opacity = 0;


   window.setTimeout(function(){
      document.getElementsByClassName('tip-title')[0].style.opacity = 1;
      document.getElementsByClassName('tip-content')[0].style.opacity = 1;
      document.getElementsByClassName('tip-comment')[0].style.opacity = 1;

      document.getElementsByClassName('tip-title')[0].textContent = tip.title;
      document.getElementsByClassName('tip-content')[0].textContent = tip.content;

      if(tip.comment) document.getElementsByClassName('tip-comment')[0].textContent = tip.comment;
      else document.getElementsByClassName('tip-comment')[0].textContent = "";

   }, FADE_INTERVAL);
}

function loadFirstTip(){
   var tip = getNextTip();// textContent
   document.getElementsByClassName('tip-title')[0].textContent = tip.title;
   document.getElementsByClassName('tip-content')[0].textContent = tip.content;
   if(tip.comment) document.getElementsByClassName('tip-comment')[0].textContent = tip.comment;
}

document.addEventListener("DOMContentLoaded", function() {

   shuffleArray(TIPS);

   var element = document.getElementsByClassName('next-tip-link')[0];
   element.addEventListener('click', function(){
      showNextTip();
   }, false);

   document.addEventListener('keypress', function(event){
      if (event.keyCode == KEY_CODE_A){
         showNextTip();
      }
   });

   // loadFirstTip();
});