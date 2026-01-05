const WINNING_SCORE = 5;

let humanScore = 0;
let computerScore = 0;

const buttons = document.querySelectorAll("button");

const scoreBoard = document.querySelector("#score");
const resultBoard = document.querySelector("#result");

function getComputerChoice() {
    const computerChoice = Math.random() * 3;
    if (computerChoice < 1) {
        return "rock";
    } else if (computerChoice < 2) {
        return "paper";
    } else {
        return "scissors";
    }
}

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        return "draw";
    } else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        return "human";
    } else {
        return "computer";
    }
}

function isGameOver() {
    return humanScore === WINNING_SCORE || computerScore === WINNING_SCORE;
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const humanSelection = button.textContent.toLowerCase();
        const computerSelection = getComputerChoice();

        const winner = playRound(humanSelection, computerSelection);

        if (winner == "human") {
            humanScore++;
        } else if (winner == "computer") {
            computerScore++;
        }

        scoreBoard.textContent = `YOU: ${humanScore} VS COMPUTER: ${computerScore}`;

        if (isGameOver()) {
            if (humanScore > computerScore) {
                resultBoard.textContent = "YOU WIN!";
            } else if (humanScore < computerScore) {
                resultBoard.textContent = "YOU LOSE!";
            }

            buttons.forEach(button => button.disabled = true);
        }
    });
});