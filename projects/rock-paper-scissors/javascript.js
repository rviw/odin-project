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

function playGame() {
    let humanScore = 0;
    let computerScore = 0;

    function playRound(humanChoice, computerChoice) {
        console.log(`YOU: ${humanChoice}\nCOMPUTER: ${computerChoice}`)

        if (humanChoice === computerChoice) {
            console.log("Draw");
            return "draw";
        } else if (
            (humanChoice === 'rock' && computerChoice === 'scissors') ||
            (humanChoice === 'paper' && computerChoice === 'rock') ||
            (humanChoice === 'scissors' && computerChoice === 'paper')
        ) {
            console.log(`You win! ${humanChoice} beats ${computerChoice}`);
            return "human";
        } else {
            console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
            return "computer";
        }
    }

    for (let round = 1; round <= 5; round++) {
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        const winner = playRound(humanSelection, computerSelection);

        if (winner === "human") {
            humanScore++;
        } else if (winner === "computer") {
            computerScore++;
        }

        console.log(`Round ${round}: YOU: ${humanScore} VS COMPUTER: ${computerScore}`);
    }

    console.log("FINAL RESULTS");
    if (humanScore > computerScore) {
        console.log("YOU WIN!");
    } else if (humanScore < computerScore) {
        console.log("YOU LOSE!");
    } else {
        console.log("DRAW!");
    }
    console.log(`FINAL SCORE\nYOU: ${humanScore} VS COMPUTER ${computerScore}`);
}

playGame();