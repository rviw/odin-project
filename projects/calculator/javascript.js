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

        case "−":
            return subtract(num1, num2);

        case "×":
            return multiply(num1, num2);

        case "÷":
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

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (currentOperator && waitingForSecondOperand) {
        currentOperator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (currentOperator) {
        const result = operate(currentOperator, firstOperand, inputValue);
        displayValue = String(Math.round(result * 10**5) / 10**5);
        firstOperand = result;
    }

    currentOperator = nextOperator;
    waitingForSecondOperand = true;
    updateDisplay();
}

function handleEquals() {
    if (currentOperator === null || waitingForSecondOperand) return;

    const inputValue = parseFloat(displayValue);
    const result = operate(currentOperator, firstOperand, inputValue);

    displayValue = inputValue === 0 && currentOperator === "÷"
                   ? "ERR"
                   : String(Math.round(result * 10**5) / 10**5);

    firstOperand = result;
    currentOperator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function backspace() {
    if (displayValue === "ERR") {
        displayValue = "0";
    } else if (displayValue.length === 1) {
        displayValue = "0";
    } else {
        displayValue = displayValue.slice(0, -1);
    }
    updateDisplay();
}

function clearCalculator() {
    displayValue = "0";
    firstOperand = null;
    currentOperator = null;
    waitingForSecondOperand = false;
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

document.querySelectorAll(".operators button").forEach(btn => {
    const op = btn.textContent;
    if (op === "=") {
        btn.addEventListener("click", handleEquals);
    } else {
        btn.addEventListener("click", () => handleOperator(op));
    }
});

document.querySelector(".menu button:first-child").addEventListener("click", backspace);

document.querySelector(".menu button:nth-child(2)").addEventListener("click", clearCalculator);