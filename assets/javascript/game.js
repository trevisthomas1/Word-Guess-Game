var hangmanWords =
  [
    "ROCKANTANSKY",
    "FURIOUSA",
    "IMMORTAN JOE",
    "SPLENDID",
    "CAPABLE",
    "TOAST THE KNOWING",
    "WHAT A LOVELY DAY",
    "WITNESS ME",
  ];

const guessLimit = 10;

var guessedLetters = [];
var currentWordIndex;
var guessWord = [];
var remainingGuesses = 0;
var gameEnd = false;
var wins = 0;

var keySound = new Audio("./assets/sounds/rifle-shot.wav");
var winSound = new Audio('./assets/sounds/boat-horn.wav');
var loseSound = new Audio('./assets/sounds/heart-beat.wav');

//__________________________________________________________________________________________//

function resetGame() {
  remainingGuesses = guessLimit;
  currentWordIndex = Math.floor(Math.random() * (hangmanWords.length));
  guessedLetters = [];
  guessWord = [];

  document.getElementById("hangmanImage").src = "";

  for (var i = 0; i < hangmanWords[currentWordIndex].length; i++) {
    guessWord.push("_");
  }

  document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
  document.getElementById("gameover").style.cssText = "display: none";
  document.getElementById("youwin").style.cssText = "display: none";

  updateDisplay();
};

//__________________________________________________________________________________________//

function updateDisplay() {

  document.getElementById("totalWins").innerText = wins;
  var guessText = "";
  for (var i = 0; i < guessWord.length; i++) {
    guessText += guessWord[i];
  }

  document.getElementById("currentWord").innerText = guessText;
  document.getElementById("remainingGuesses").innerText = remainingGuesses;
  document.getElementById("guessedLetters").innerText = guessedLetters;
};

//__________________________________________________________________________________________//

function updateHangmanImage() {
  document.getElementById("hangmanImage").src = "assets/images/" + (guessLimit - remainingGuesses) + ".png";
};

//__________________________________________________________________________________________//

function checkGuess(letter) {
  var positions = [];

  for (var i = 0; i < hangmanWords[currentWordIndex].length; i++) {
    if (hangmanWords[currentWordIndex][i] === letter) {
      positions.push(i);
    }
  }

  if (positions.length <= 0) {
    remainingGuesses--;
    updateHangmanImage();
  } else {

    for (var i = 0; i < positions.length; i++) {
      guessWord[positions[i]] = letter;
    }
  }
};

//__________________________________________________________________________________________//

function checkWin() {
  if (guessWord.indexOf("_") === -1) {
    document.getElementById("youwin").style.cssText = "display: block";
    document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
    wins++;
    winSound.play();
    gameEnd = true;
  }
};

//__________________________________________________________________________________________//

function checkLoss() {
  if (remainingGuesses <= 0) {
    loseSound.play();
    document.getElementById("gameover").style.cssText = "display: block";
    document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
    gameEnd = true;
  }
}

//__________________________________________________________________________________________//

function makeGuess(letter) {
  if (remainingGuesses > 0) {

    if (guessedLetters.indexOf(letter) === -1) {
      guessedLetters.push(letter);
      checkGuess(letter);
    }
  }

};


//__________________________________________________________________________________________//

document.onkeyup = function (event) {

  if (gameEnd) {
    resetGame();
    gameEnd = false;
  } else {

    if (event.keyCode = 8 || event.keyCode >= 65 && event.keyCode <= 90) {
      keySound.play();
      makeGuess(event.key.toUpperCase());
      updateDisplay();
      checkWin();
      checkLoss();
    }
  }
};