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

/*----- cached element references -----*/
const startButton = document.getElementById('start');
const alphabetContainer = document.getElementById('alphabet');
const currentWordEl = document.getElementById('word');
const spacemanEl = document.getElementById('spaceman');

/*----- event listeners -----*/
startButton.addEventListener('click', init);
alphabetContainer.addEventListener('click', makeMove);

/*----- functions -----*/
function init() {
  // Set spaceship default values to invisible
  spaceship = {
    top: false,
    body: false,
    lights: false,
    bottom: false,
    beams: false
  }

  wrongLetter = 0;
  usedLetters = [];
  currentWordEl.innerText = '';
  currentWordEl.style.color = 'black';

  // Display alphabet container
  setVisibility(alphabetContainer, 'block');

  // Show spaceman
  setVisibility(spacemanEl, 'block');

  // Chooses random word from WORDBANK and saves each letter to the guessedWord array
  const rand = Math.floor(Math.random() * WORDBANK.length);
  guessedWord = WORDBANK[rand].split('');

  // Debugging purposes only - display current word
  currentWord = WORDBANK[rand];
  console.log(currentWord);

  // Calls function render()
  render(); 
}

// Calls all page renders: renderSpaceship, renderGuessedWord, renderAlphabet
function render() {
  // Set all spaceship components to be invisible
  for (const component in spaceship) {
    setVisibility(document.getElementById(component),'none');
    // setVisibility(document.getElementById(component), 'none');
  }

  // Makes Start button invisible
  setVisibility(startButton, 'none');

  // Function calls further render functions according to current game state: 
  renderGuessedWord();
  renderAlphabet();
  renderSpaceship();
}

// for each letter in guessed word create elenent span and set innerText=letter if letter is included; else add ' ' to the span
function renderGuessedWord() {
  guessedWord.forEach((letter, idx) => {
    //check if span with id not exists then create span
    if (!getWordLetterEl(idx)) {
      createChildForParent('span', makeWordLeterElId(idx), currentWordEl);
    }

    if (usedLetters.includes(letter)) {
      getWordLetterEl(idx).innerText = letter;
    } else {
      getWordLetterEl(idx).innerText = '_';
    }
  });

  if (currentWordEl.innerText === currentWord) {
    
    return showMessage('win');
  }
}

// renders alphabet on the page and disables clicked letter buttons
function renderAlphabet() {
  ALPHABET.split('').forEach(letter => {
    // check if the button is not on the page then add it
    if (!getLetterBtn(letter)) {
      const letterBtn = createChildForParent('button', getLetterBtnId(letter), alphabetContainer);
      letterBtn.innerText = letter;
    }

    // check if the letter was clicked then disable it
    if (usedLetters.includes(letter.toLowerCase())) {
      getLetterBtn(letter).disabled = true;
    } else {
      getLetterBtn(letter).disabled = false;
    }
  });
}

// get value from spaceship obj and if spaceship component visibility === true show component
function renderSpaceship() {
  for (const component in spaceship) {
    if (spaceship[component] === true) {
      setVisibility(document.getElementById(component), 'block');
    }
  }
}

// this function is a callback of the alphabetContainer event listener. It gets event from event listener and we can get target to find out which button was clicked
function makeMove(evt) {
  if (evt.target.tagName !== 'BUTTON') return;
  const letter = evt.target.innerText
  usedLetters.push(letter.toLowerCase());
  // if user clicked the letter that is not included in word, add +1 to the wrongLetter
  if(!guessedWord.includes(letter.toLowerCase())) {
    if (wrongLetter >= Object.keys(spaceship).length) {
      setVisibility(spacemanEl, 'none');
      return showMessage('loss');
    }
    wrongLetter += 1;
  }

  // handle wrong letters
  for (let i = 0; i < wrongLetter;  i++) {
    const objName = Object.keys(spaceship)[i]
    spaceship[objName] = true;
  }

  render();
}

/*----- helpers -----*/
function showMessage(type) {
  if (type === 'loss') {
    // Show guessed word in red
    currentWordEl.innerText = currentWord;
    currentWordEl.style.color = 'red';
    // create button try again
    startButton.innerText = 'TRY AGAIN ?';
  } else if (type === 'win') {
    // create button try again
    startButton.innerText = 'YOU WON! TRY AGAIN ?';
  }
  setVisibility(alphabetContainer, 'none');
  setVisibility(startButton, 'block');
}

function setVisibility(element, value) {
  return element.style.display = value;
}

function createChildForParent(type, id, parentId) {
  const newEl = document.createElement(type);
  newEl.id = id;
  parentId.appendChild(newEl);
  return newEl;
}

function makeWordLeterElId(idx) {
  return 'span-' + idx;
}

function getWordLetterEl(idx) {
  return document.getElementById(makeWordLeterElId(idx));
}

function getLetterBtnId(letter) {
  return 'letter-' + letter;
}

function getLetterBtn(letter) {
  return document.getElementById(getLetterBtnId(letter));
}