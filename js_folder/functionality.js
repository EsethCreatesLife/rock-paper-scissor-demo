// Selecting elements from the DOM
const playerScore = document.querySelector(".player-score");
const aiScore = document.querySelector(".ai-score");
const playBtn = document.querySelector(".playBtn");
const opBtn = document.querySelector(".options");

const rockBtn = document.querySelector(".rock");
const paperBtn = document.querySelector(".paper");
const scissorsBtn = document.querySelector(".scissors");
const comHand = document.querySelector(".computer-hand");
const playerHand = document.querySelector(".player-hand");
const winnerdisplay = document.querySelector(".winner-tag");

// Setting variables
let score0El = 0;
let score1El = 0;
let displayWin;
const items = ["rock", "paper", "scissors"];

// Function to generate a random choice for the computer
const ai = function () {
  // Generate a random index (0, 1, or 2)
  const randint = Math.trunc(Math.random() * 3);
  // Update the computer hand image source
  comHand.src = `/assets/${items[randint]}.png`;
  // Return the chosen item
  return items[randint];
};

// Function to determine the winner of the round
const determinWin = function (player) {
  // Get the computer's choice
  let aiChoice = ai();
  // Update the player's hand image source
  playerHand.src = `/assets/${items[player]}.png`;

  // Determine the winner based on choices
  if (
    (player === 0 && aiChoice === "rock") ||
    (player === 1 && aiChoice === "paper") ||
    (player === 2 && aiChoice === "scissors")
  ) {
    displayWin = "It's a tie";
  } else if (
    (player === 0 && aiChoice === "paper") ||
    (player === 1 && aiChoice === "scissors") ||
    (player === 2 && aiChoice === "rock")
  ) {
    displayWin = "Computer wins";
    score1El++;
  } else if (
    (player === 0 && aiChoice === "scissors") ||
    (player === 1 && aiChoice === "rock") ||
    (player === 2 && aiChoice === "paper")
  ) {
    displayWin = "Player wins";
    score0El++;
  }

  // Display the winner and update scores
  winnerdisplay.classList.remove("hide");
  winnerdisplay.textContent = displayWin;
  playerScore.textContent = score0El;
  aiScore.textContent = score1El;
};

// Function to reset the game
const re = function () {
  // Remove the existing event listener for "Restart Game" button
  playBtn.removeEventListener("click", re);

  // Reset scores and hand images
  score0El = 0;
  score1El = 0;
  comHand.src = `/assets/${items[0]}.png`;
  playerHand.src = `/assets/${items[0]}.png`;
  playerScore.textContent = score0El;
  aiScore.textContent = score1El;

  // Add a new event listener for "Play" button after resetting
  playBtn.addEventListener("click", setupGame);
};

// Event listener for the "Play" button
const setupGame = function () {
  // Show options and change button appearance
  opBtn.classList.remove("hide");
  playBtn.innerHTML = "Restart Game";
  playBtn.style.backgroundColor = "#EF5350";

  // Remove the existing event listener for "Play" button
  playBtn.removeEventListener("click", setupGame);

  // Add event listener for "Restart Game" button
  playBtn.addEventListener("click", re);

  // Event listeners for rock, paper, and scissors buttons
  rockBtn.addEventListener("click", function () {
    determinWin(0);
  });

  paperBtn.addEventListener("click", function () {
    determinWin(1);
  });

  scissorsBtn.addEventListener("click", function () {
    determinWin(2);
  });
};

// Initial setup for the game
playBtn.addEventListener("click", setupGame);
