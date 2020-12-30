'use strict';
// DOM elements
const checkButton = document.querySelector('.check');
const input = document.querySelector('input.guess');
const message = document.querySelector('.message');
const scoreSpan = document.querySelector('span.score');
const numberDisplay = document.querySelector('.number');
const highScoreSpan = document.querySelector('span.highscore');
const againButton = document.querySelector('.again');

// variables
var score = 20;
var answer = Math.floor(Math.random() * 20);
var highScore = 0;

// function to reset and start from scratch (highscore is preserved)
const reset = () => {
  // recreate the variables for the game
  score = 20;
  answer = Math.floor(Math.random() * 20);
  document.querySelector('body').style.backgroundColor = '#222';
  // hide the answer and set it back to '?'
  numberDisplay.style.width = '15rem';
  numberDisplay.textContent = '?';
  updateScore();
};

// update the score in the UI
const updateScore = () => {
  scoreSpan.textContent = score;
  if (score < 1) handleDefeat();
};

// central function
const handleGuess = () => {
  const guess = Number(input.value);
  // check if the input is a valid number
  if (guess || guess === 0) {
    if (guess === answer) {
      handleWin();
    } else if (guess < answer) {
      displayMessage('Too low');
      score -= 1;
      updateScore();
    } else if (guess > answer) {
      displayMessage('Too high');
      score -= 1;
      updateScore();
    }
  } else {
    // No valid input . score doesn't get affected
    displayMessage('⛔️ No number!');
  }
};

// the main submit button for guessing
checkButton.addEventListener('click', handleGuess);

// utility function for displaying the message in the UI
const displayMessage = content => {
  message.innerText = content;
};

// If the user arrives at the answer.
const handleWin = () => {
  // clear the input and display the result in the UI
  input.value = '';
  displayMessage('🎉 You got the answer');
  // update the highscore if the current score is higher
  if (highScore < score) highScore = score;
  highScoreSpan.innerText = highScore.toString();
  // reveal the answer
  numberDisplay.style.width = '30rem';
  numberDisplay.textContent = answer;
  // green bg
  document.querySelector('body').style.backgroundColor = '#52b788';
};

// If the user exceeded 20 tries
const handleDefeat = () => {
  // clear the input and reveal the answer
  input.value = '';
  numberDisplay.style.width = '30rem';
  numberDisplay.textContent = answer;
  // update the message and set the bg to red
  displayMessage('💥 You lost the game!');
  document.querySelector('body').style.backgroundColor = '#ef233c';
};

// reset button listener
againButton.addEventListener('click', () => reset());

// call handleGuess function whenever enter key is pressed
input.addEventListener('keypress', e => {
  if (e.keyCode === 13) {
    handleGuess();
  }
});
