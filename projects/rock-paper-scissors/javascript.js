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

console.log(getComputerChoice());
console.log(getHumanChoice());