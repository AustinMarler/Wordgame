$(document).ready(function(){

    /* Keeps track of turns/life/health */
    var life = 8;
    var lifeBar = document.querySelector("#health");
    lifeBar.innerHTML = `Turns left: ${life}`; // to be put outside of Game class


    /* Filters the common word list then picks a random word */
    var wordList = commonWords.filter(function(a){
        return (a.length >= 3);
    });
    var randomWord = wordList[Math.floor(Math.random() * wordList.length)];


    /* Plugs in the spaces for the word to be guessed */
    var wordToGuessContainer = document.querySelector('#wordToGuess');
    var wordGuessString = [];
    wordGuessString = randomWord.split('').map(function(letter){
        return `
        <div class="wordLetter">
            <p class="hiddenLetter">${letter.toUpperCase()}</p>
        </div>
        `
    }).join(''); //to be put outside of game class
    wordToGuessContainer.innerHTML = wordGuessString; //to be put outside of game class


    /* Guess letter function */
    function guessLetter(letter){

        var possibleLetters = $("#wordToGuess").find("div").find("p");
        var correctCheck = false;
        Array.from(possibleLetters).forEach(function(a){
            if (a.innerHTML === letter && a.className === 'hiddenLetter') {
                a.className = '';
                correctCheck = true;
            }
        })
        if (!(correctCheck)) {
            var audio = new Audio("./assets/Wrong-answer-sound-effect.mp3");
            audio.play();
            life--;
            lifeBar.innerHTML = `Turns left: ${life}`;
        }
        
    }


    // will be put outside of Game class
    /* Listens for the click of one of the letters */
    $("#letters li").on("click", function(){
        if (!($(this).hasClass("guessed"))) {
            $(this).addClass("guessed");
            var letter = $(this).html();
            guessLetter(letter);
        } else {
            // code to inform of an already guessed letter and what to do
        }
        checkWinOrLose();
    })


    /* Checks whether the game has been won or lost */
    function checkWinOrLose(){
        var possibleLetters = $("#wordToGuess").find("div").find("p");
        if (life <= 0) {
            gameLost();
        }
        else {
            var check;
            Array.from(possibleLetters).forEach(function(a){
                if (a.className === 'hiddenLetter') {
                    check = true;
                }
            })

            if (!(check)) {
                gameWon();
            }

        }
    }


    /* Game won function */
    function gameWon(){
        alert('Winner!');
    }


    /* Game lost function */
    function gameLost(){
        alert('Loser!');
    }

})