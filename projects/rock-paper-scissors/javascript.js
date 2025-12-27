let humanScore = 0;
let computerScore = 0;

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

function getHumanChoice() {
    const humanChoice = prompt("Choose: rock, paper, or scissors").toLowerCase();
    return humanChoice;
}

function playRound(humanChoice, computerChoice) {
    console.log(`YOU: ${humanChoice}\nCOMPUTER: ${computerChoice}`)

    if (humanChoice === computerChoice) {
        console.log("Draw");
    } else if (
        (humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'paper' && computerChoice === 'rock') ||
        (humanChoice === 'scissors' && computerChoice === 'paper')
    ) {
        console.log(`You win! ${humanChoice} beats ${computerChoice}`);
        humanScore++;
    } else {
        console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
        computerScore++;
    }

    console.log(`Your score: ${humanScore}\nComputer's score: ${computerScore}`);
}

const humanSelection = getHumanChoice();
const computerSelection = getComputerChoice();

playRound(humanSelection, computerSelection);