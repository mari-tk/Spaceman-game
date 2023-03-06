# Spaceman-game
Is a word guessing game. Computer thinks of a word, the player guesses it by choosing letters from the alphabet. There are certain amount of guesses - to draw a spaceship. After player guesses the word, they win. If player used all guesses and still not guessed the word, they lose.

Game action.

After user opens the game, it shows up empty board with clickable "Start" button on the center of the page. 
It also shows message: "Click on Start button to start a new game!".

After user clicked on the Start button, game state variables are set to default. 

Also function init() is called.

constants
//English alphabet
ALPHABET = [a,b,c....] 

app's state (variables)
Game state variables:
-guessedWord - array of letters from the guessed word set to []
-wordBank - array of possible words for Computer to choose from. Hardcoded with default words array
-spaceship
-usedLetters

cached element references
startButton = document.getElementById(start)
alphabetContainer = document.getElementById(alphabet)

event listeners
startButton.addEventListener('click', init);
alphabetContainer.addEventListener('click', makeMove);

functions
function init() { //Function resets all state variables. 
  // Makes Start button and full screen overlay invisible
  startButton.style.visibility=false
  // Makes spaceman visible
  spacemanEl.style.visibility=true

  // Set spaceship default values
  spaceship = [
    {body: img, visible:false},
    {cabin: img, visible:false},
    {window: img, visible:false},
    {wings: img, visible:false},
    {fuel: img, visible:false}
  ]
  usedLetters = []

  guessedWord = random(wordBank) //Chooses random word from wordBank and saves each letter to the guessedWord array
  render() //Calls function render()
}

// Calls all page renders: renderSpaceship, renderGuessedWord, renderAlphabet
function render() {
  //Makes spaceman invisible if player used all 5 guesses and makes another unsuccessful turn
  if (everySpaceshipComponentIsVisible()) {
    document.getElementById(spaceman).visibility = false
  }

  // Function calls further render functions according to current game state: 
  renderSpaceship()
  renderGuessedWord()
  renderAlphabet()
}

// get value from spaceship obj and if spaceship component visibility === true show component
function renderSpaceship() {
  for component in spaceship {
    if component.visible {
      showDomComponent(component)
    }
  }
}

// for each letter in guessed word create elenent span and set innerText=letter if letter is included; else add ' ' to the span
function renderGuessedWord() {
  guessedWord.forEach(letter) {
    span = document.createElement('span')
    if usedLetters.includes(letter){
      span.innerText = letter
    }
    else {
      span.innerText = ' '
    }
  }
}

// renders alphabet on the page and disables clicked letter buttons
function renderAlphabet() {
  alphabet.forEach(function (letter, idx) {
    btn = document.createElement('button')
    btn.innerText = letter
    btn.disabled = usedLetters.includes(letter)
  })
}

// this function is a callback of the alphabetContainer event listener. It gets event from event listener and we can get target to find out which button was clicked
function makeMove(ev) {
  if (evt.target.tagName !=='BUTTON') return
  const letter = ev.target.innerText
  usedLetters.push(letter)
  render()
}
