// helper function to get element by id
const getElementById = (id) => document.getElementById(id);

const greetUser = getElementById("greetUser");
const logoutBtn = getElementById("logoutBtn");
const problemImage = getElementById("problemImage");
const solutionForm = getElementById("solutionForm");
const solutionTxt = getElementById("solutionTxt");
const solutionBtn = getElementById("solutionBtn");
const playAgainBtn = getElementById("playAgainBtn");
const currentScore = getElementById("currentScore");
const questionNo = getElementById("questionNo");
const endGameMessage = getElementById("endGameMessage");

let timerInterval;
let solution = -1;
let score = 0;
let totalQuestions = 0;
let correct = 0;

// This function checks if the user is already logged in
// if yes greet the user
// else redirect the user to login page
const checkIfLoggedIn = () => {
  const usernameCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("username="))
    ?.split("=")[1];

  if (!usernameCookie) {
    location.href = "login.html";
  }

  greetUser.innerText = `Welcome, ${usernameCookie}`;
};

// fetch new problem from api and show it to the user
const fetchProblem = async () => {
  try {
    const response = await fetch("https://marcconrad.com/uob/tomato/api.php");
    const data = await response.json();

    problemImage.src = data.question;
    solution = data.solution;
    totalQuestions += 1;
    questionNo.innerText = totalQuestions;
  } catch (error) {
    console.error("Error while fetching the problem", error);
  }
};

// function the validates the user answer with the problem solution
// if correct increment the score
// else decrement the score
// this function also checks if the current score is greater then
// the previous high score, if yes update it
const handleSolutionSubmit = (e) => {
  e.preventDefault();
  const userSolution = solutionTxt.value;

  if (userSolution == solution) {
    score += 1;
    correct += 1;
  } else {
    score -= 1;
  }

  fetchProblem();
  currentScore.innerText = score;

  const highScore = localStorage.getItem("highScore") || 0;
  if (highScore < score) {
    localStorage.setItem("highScore", score);
  }
};

// this function starts a timer of 10 minutes
// after 10 minutes games stops and prints the results
const startTimer = (duration) => {
  let timer = duration;

  timerInterval = setInterval(() => {
    const minutes = parseInt(timer / 60, 10);
    const seconds = parseInt(timer % 60, 10);

    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("timer").textContent =
      formattedMinutes + ":" + formattedSeconds;

    if (timer === 0) {
      endGameMessage.innerText = `Time's up! You solved ${correct} problem${correct > 1 ? "s" : ""} out of ${totalQuestions}. Your highest score is ${localStorage.getItem(
        "highScore"
      ) || 0}`;
      clearInterval(timerInterval);
      solutionTxt.readOnly = true;
      solutionBtn.disabled = true;
    } else {
      timer -= 1;
    }
  }, 1000);
};

// this function is used to restart the game at any point of time
// by reseting the timer and other values
const restartGame = () => {
  clearInterval(timerInterval);
  endGameMessage.innerText = "";
  solutionTxt.readOnly = false;
  solutionBtn.disabled = false;
  totalQuestions = 0;
  score = 0;
  currentScore.innerText = score;
  correct = 0;
  fetchProblem();
  startTimer(600);
};

// when user clicks the logout button, delete the cookie and redirect the user to login page
const logoutUser = () => {
  document.cookie = "username=test; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  location.href = "login.html";
};

// event bindings
document.addEventListener("DOMContentLoaded", checkIfLoggedIn);
logoutBtn.addEventListener("click", logoutUser);
solutionForm.addEventListener("submit", handleSolutionSubmit);
playAgainBtn.addEventListener("click", restartGame);

// start the game
fetchProblem();
startTimer(600);
