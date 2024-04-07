'use strict';

//Select Elements
const playerEl = Array(2);
const scoreEl = Array(2);
const currScoreEl = Array(2);

playerEl[0] = document.querySelector('.player-1');
playerEl[1] = document.querySelector('.player-2');
scoreEl[0] = document.getElementById('score-1');
scoreEl[1] = document.getElementById('score-2');
currScoreEl[0] = document.getElementById('current-score-1');
currScoreEl[1] = document.getElementById('current-score-2');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

let scores, currScore, activePlayer, isPlaying;
const MAX_SCORE = 100;

const init = function () {
  scores = [0, 0];
  currScore = 0;
  activePlayer = 0;
  isPlaying = true;

  scoreEl[0].textContent = 0;
  scoreEl[1].textContent = 0;
  currScoreEl[0].textContent = 0;
  currScoreEl[1].textContent = 0;

  diceEl.classList.add('hidden');
  playerEl[0].classList.remove('player-winner');
  playerEl[1].classList.remove('player-winner');
  playerEl[0].classList.add('player-active');
  playerEl[1].classList.remove('player-active');
};

const switchTurn = function () {
  scores[activePlayer] += currScore;
  scoreEl[activePlayer].textContent = scores[activePlayer];

  if (scores[activePlayer] >= MAX_SCORE) {
    console.log(
      `Player ${activePlayer + 1} Won with ${scores[activePlayer]} points.`
    );
    playerEl[activePlayer].classList.add('player-winner');
    diceEl.classList.add('hidden');
    isPlaying = false;
  } else {
    playerEl[0].classList.toggle('player-active');
    playerEl[1].classList.toggle('player-active');
    console.log(
      `Player ${activePlayer + 1} added ${currScore} points and has total of ${
        scores[activePlayer]
      } points.`
    );
    currScoreEl[activePlayer].textContent = currScore = 0;
    activePlayer = 1 - activePlayer;
  }
};

init();

//Start new game
btnNew.addEventListener('click', init);

//Roll dice
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    console.log(`Player ${activePlayer + 1} rolled ${dice}.`);

    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${dice}.png`;

    if (dice === 1) {
      currScore = 0;
      currScoreEl[activePlayer].textContent = 0;
      switchTurn();
    } else {
      currScore += dice;
      currScoreEl[activePlayer].textContent = currScore;
    }
  }
});

//End turn
btnHold.addEventListener('click', function () {
  if (isPlaying) {
    switchTurn();
  }
});
