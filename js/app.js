/*----- constants -----*/
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const WORDBANK = ['jupiter', 'saturn', 'uranus', 'mercury', 'venus', 'earth', 'neptune', 'mars']
//background Space theme music?

/*----- app's state (variables) -----*/
let guessedWord;
let spaceship;
let usedLetters;
let wrongLetter;
let currentWord;
let currentWordEl;

/*----- cached element references -----*/
let startButton = document.getElementById('start');
alphabetContainer = document.getElementById('alphabet');
currentWordEl = document.getElementById('word');

/*----- event listeners -----*/
startButton.addEventListener('click', init);
alphabetContainer.addEventListener('click', makeMove);

/*----- functions -----*/
function init() {
  // Set spaceship default values to invisible
  spaceship = [
    {body: './img/spaceship', visible:false},
    {cabin: './img/spaceship', visible:false},
    {window: './img/spaceship', visible:false},
    {wings: './img/spaceship', visible:false},
    {fuel: './img/spaceship', visible:false}
  ]
  wrongLetter = 0;
  usedLetters = [];
  currentWordEl.innerText = '';
  currentWordEl.style.color = 'black';

  //Display alphabet container
  alphabetContainer.style.display = 'block';

  //Chooses random word from WORDBANK and saves each letter to the guessedWord array
  const rand = Math.floor(Math.random() * WORDBANK.length);
  guessedWord = (WORDBANK[rand].split(""));

  //Debugging purposes only - display current word
  currentWord = WORDBANK[rand];
  console.log(currentWord);

  //Set all buttons to active and clickable again


  //Calls function render()
  render(); 
}

//TODO: refactor rendering, convert to functions
// Calls all page renders: renderSpaceship, renderGuessedWord, renderAlphabet
function render() {
  // Set all spaceship components to be invisible
  spaceship.forEach(component => {
    document.getElementById(Object.keys(component)[0]).style.display = 'none';
  })

  // Makes Start button invisible
  startButton.style.display = 'none';

  // Function calls further render functions according to current game state: 
  renderGuessedWord();
  renderAlphabet();
  renderSpaceship();

  //Makes spaceman invisible if player used all 5 guesses and makes another unsuccessful turn
  // if (everySpaceshipComponentIsVisible()) {
  //   document.getElementById(spaceman).visibility = false
  // }
}

// for each letter in guessed word create elenent span and set innerText=letter if letter is included; else add ' ' to the span
function renderGuessedWord() {
  guessedWord.forEach((letter, idx) => {
    //check if span with id not exists then create span
    if(!document.getElementById('span-' + idx)) {
      let span = document.createElement('span');
      span.id = 'span-' + idx;
      document.getElementById('word').appendChild(span);
    }

    if(usedLetters.includes(letter)) {
      document.getElementById('span-' + idx).innerText = letter;
    }
    else {
      document.getElementById('span-' + idx).innerText = '_';
    }
  }) 
  if (currentWordEl.innerText === currentWord) return showWin()
}

// renders alphabet on the page and disables clicked letter buttons
function renderAlphabet() {
  ALPHABET.split("").forEach(letter => {
    //check if the button is not on the page then add it
    if (!document.getElementById('letter-' + letter)) {
      const letterBtn = document.createElement('button');
      document.getElementById('alphabet').appendChild(letterBtn);
      letterBtn.innerText = letter;
      letterBtn.id = 'letter-' + letter;
    }

    //check if the letter was clicked then disable it
    if (usedLetters.includes(letter.toLowerCase())) {
      document.getElementById('letter-' + letter).disabled = true
    }
    else document.getElementById('letter-' + letter).disabled = false
  })
}

// get value from spaceship obj and if spaceship component visibility === true show component
function renderSpaceship() {
  for (component of spaceship) {

    //if component visibility === true show component
    if (component.visible) {
      document.getElementById(Object.keys(component)[0]).style.display = 'block';
    }
  }
}

// this function is a callback of the alphabetContainer event listener. It gets event from event listener and we can get target to find out which button was clicked
function makeMove(evt) {
  if (evt.target.tagName !=='BUTTON') return
  const letter = evt.target.innerText
  usedLetters.push(letter.toLowerCase());
  //if user clicked the letter that is not included in word, add +1 to the wrongLetter
  if(!guessedWord.includes(letter.toLowerCase())) {
    if (wrongLetter>=spaceship.length) return showLoss()
    wrongLetter+=1
  }

  //handle wrong letters
  for(i=0; i<wrongLetter;  i++) {
    spaceship[i].visible = true
  }

  render();
}

function showLoss() {
  //Show guessed word in red
  const word = document.getElementById("word");
  word.innerText = currentWord;
  word.style.color = 'red';

  //create button try again
  startButton.innerText = 'TRY AGAIN ?';
  startButton.style.display = 'block';
  alphabetContainer.style.display = 'none';
}

function showWin() {
  //disable all alphabet
  alphabetContainer.style.display = 'none';

  //create button try again
  startButton.innerText = 'YOU WON! TRY AGAIN ?';
  startButton.style.display = 'block';
}