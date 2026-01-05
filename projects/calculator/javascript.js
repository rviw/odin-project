function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);

        case "-":
            return subtract(num1, num2);

        case "*":
            return multiply(num1, num2);

        case "/":
            return divide(num1, num2);
    }
}

function updateDisplay() {
    const display = document.querySelector(".display");
    display.textContent = displayValue;
}

function appendDigit(digit) {
    if (displayValue === "ERR") return;

    if (waitingForSecondOperand) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === "0" ? digit : displayValue + digit;
    }
    if (displayValue.length > MAX_DIGITS) {
        displayValue = "ERR";
    }
    updateDisplay();
}

const MAX_DIGITS = 10;

let displayValue = "0";
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let waitingForSecondOperand = false;

document.querySelectorAll(".numbers button").forEach(btn => {
    btn.addEventListener("click", () => appendDigit(btn.textContent));
});