"use strict";

// selecting elements
const player0Elem = document.querySelector(".player--0");
const player1Elem = document.querySelector(".player--1");
const currentElem0 = document.getElementById("current--0");
const currentElem1 = document.getElementById("current--1");
const score0Elem = document.getElementById("score--0");
const score1Elem = document.getElementById("score--1");
const diceElem = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");

/////////////
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Elem.textContent = 0;
  score1Elem.textContent = 0;
  currentElem0.textContent = 0;
  currentElem1.textContent = 0;

  diceElem.classList.add("hidden");
  player0Elem.classList.remove("player--winner");
  player1Elem.classList.remove("player--winner");
  player0Elem.classList.add("player--active");
  player1Elem.classList.remove("player--active");
};
init();

let switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;
  player0Elem.classList.toggle("player--active");
  player1Elem.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    diceElem.classList.remove("hidden");
    diceElem.src = `Images/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceElem.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
