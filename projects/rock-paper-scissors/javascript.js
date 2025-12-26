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

console.log(getComputerChoice());