"use strict";
const startButton = document.getElementById("startButton");
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const gameOver = document.querySelector(".gameOver");
const closeModal = document.querySelector(".close-modal");
const timeRaiston = document.querySelector(".timeRaiston");
let score = 0;
let gameActive = false;
let gameTimer;
let countdownTimer;
let gameDuration = 30; // Duration of the game in seconds

startButton.addEventListener("click", startGame);

// the function to start the game;
function startGame() {
  gameActive = true;
  startButton.disabled = true;
  countdownTimer = setInterval(updateTimer, 1000);
  gameTimer = setInterval(createGameElement, 1000);
}

function updateTimer() {
  gameDuration--;
  timeRaiston.textContent = `Time Raiston ⌛️ : ${gameDuration}s`;
  if (gameDuration === 0) {
    clearInterval(countdownTimer);
    endGame();
  }
}

/*the function how create the element inside the game Area and increase the score
 and remove it if its click  */
function createGameElement() {
  if (!gameActive) return;

  const element = document.createElement("div");
  element.classList.add("gameElement");
  element.style.left = Math.random() * (gameArea.offsetWidth - 50) + "px";
  element.style.top = Math.random() * (gameArea.offsetHeight - 50) + "px";
  element.addEventListener("click", function () {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    gameArea.removeChild(element);
  });
  //   if the element is not clicked ;
  gameArea.appendChild(element);
}

// Timer for game duration
// setTimeout(endGame, 10000); // Game duration: 10 seconds

// the function how end the game by reset all to the noraml state;
function endGame() {
  gameActive = false;
  clearInterval(gameTimer);
  // alert(`Game Over!💀 Your final score is: ${score}`);
  gameOver.classList.remove("hidden");
  document.querySelector(
    ".gameOver p"
  ).textContent = `Your final score is: ${score}`;
  closeModal.addEventListener("click", function () {
    gameOver.classList.add("hidden");
  });

  startButton.disabled = false;
  score = 0;
  scoreDisplay.textContent = `Score ${score}`;
  gameArea.innerHTML = "";
  gameDuration = 30; // Reset game duration
  timeRaiston.textContent = `Time Raiston ⌛️ : ${gameDuration}s`; // Reset timer display
}
