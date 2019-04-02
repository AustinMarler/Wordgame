$(document).ready(function(){

    var wordList = commonWords.filter(function(a){
        return (a.length >= 3);
    });

    var randomWord = wordList[Math.floor(Math.random() * wordList.length)];

})