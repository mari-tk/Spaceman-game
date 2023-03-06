/*----- constants -----*/
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const WORDBANK = ['jupiter', 'saturn', 'uranus', 'mercury', 'venus']
//background space theme music?

/*----- app's state (variables) -----*/
let guessedWord;
let spaceship;
let usedLetters;

/*----- cached element references -----*/
let startButton = document.getElementById('start');
alphabetContainer = document.getElementById('alphabet');

/*----- event listeners -----*/
startButton.addEventListener('click', init);

// alphabetContainer.addEventListener('click', makeMove);


/*----- functions -----*/
function init() {

  // Set spaceship default values to invisible
  spaceship = [
    {body: './img/spaceship', visible:true},
    {cabin: './img/spaceship', visible:false},
    {window: './img/spaceship', visible:false},
    {wings: './img/spaceship', visible:false},
    {fuel: './img/spaceship', visible:false}
  ]

  usedLetters = [];
  //Chooses random word from WORDBANK and saves each letter to the guessedWord array
  const rand = Math.floor(Math.random() * WORDBANK.length);

  guessedWord = (WORDBANK[rand].split(""));

  //Calls function render()
  render(); 
}

// Calls all page renders: renderSpaceship, renderGuessedWord, renderAlphabet

function render() {
    // Set all spaceship components to be invisible

    // Makes Start button invisible
    startButton.style.display = 'none';

    // Makes spaceman visible
    document.getElementById('spaceman').style.display = 'block';
    document.getElementById('spaceship').style.display = 'block';
    document.getElementById('word').style.display = 'block';

  //Makes spaceman invisible if player used all 5 guesses and makes another unsuccessful turn

  // if (everySpaceshipComponentIsVisible()) {

  //   document.getElementById(spaceman).visibility = false

  // }


  // Function calls further render functions according to current game state: 

  renderGuessedWord();
 
  renderSpaceship();


  // renderAlphabet()

}



// get value from spaceship obj and if spaceship component visibility === true show component

function renderSpaceship() {
  for (component of spaceship) {
    //if component of the spaceship should be visible assign display:block to it
    if (component.visible) {
      console.log('here');
      document.getElementById('spaceship').style.display = 'block';
    }
  }
}



// for each letter in guessed word create elenent span and set innerText=letter if letter is included; else add ' ' to the span

function renderGuessedWord() {

  guessedWord.forEach(letter => {
    let span = document.createElement('span');
    if (usedLetters.includes(letter)){
      span.innerText = letter;
    }
    else {
      span.innerText = ' ';
    }
    document.getElementById('word').appendChild(span);
  }) 
}



// renders alphabet on the page and disables clicked letter buttons

// function renderAlphabet() {

//   alphabet.forEach(function (letter, idx) {

//     btn = document.createElement('button')

//     btn.innerText = letter

//     btn.disabled = usedLetters.includes(letter)

//   })

// }



// this function is a callback of the alphabetContainer event listener. It gets event from event listener and we can get target to find out which button was clicked

function makeMove(ev) {

  if (evt.target.tagName !=='BUTTON') return
  const letter = ev.target.innerText
  usedLetters.push(letter);

  render()

}
