const MAX_DIGITS = 10;

let displayValue = "0";
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let waitingForSecondOperand = false;

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
        const sanitized = displayValue.replace(".", "");
        if (sanitized.length < MAX_DIGITS) {
            displayValue = displayValue === "0" ? digit : displayValue + digit;
        }
    }
    updateDisplay();
}

function addFloatingPoint() {
    if (displayValue === "ERR") return;

    if (waitingForSecondOperand) {
        displayValue = "0.";
        waitingForSecondOperand = false;
        updateDisplay();
        return;
    }

    if (!displayValue.includes(".")) {
        displayValue += ".";
        updateDisplay();
    }
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
        displayValue = formatResult(result);
        firstOperand = displayValue === "ERR" ? null : result;
    }

    currentOperator = nextOperator;
    waitingForSecondOperand = true;
    updateDisplay();
}

function handleEquals() {
    if (currentOperator === null || waitingForSecondOperand) return;

    const inputValue = parseFloat(displayValue);

    if (currentOperator === "÷" && inputValue === 0) {
        displayValue = "ERR";
    } else {
        const result = operate(currentOperator, firstOperand, inputValue);
        displayValue = formatResult(result);
        firstOperand = displayValue === "ERR" ? null : result;
    }

    currentOperator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function formatResult(value) {
    const [intPart, decPart] = String(value).split(".");
    if (intPart.length > MAX_DIGITS) return "ERR";

    if (decPart) {
        const allowedDecimals = MAX_DIGITS - intPart.length;
        return Number(value.toFixed(allowedDecimals)).toString();
    }
    
    return String(value);
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
document.querySelector(".menu button:last-child").addEventListener("click", addFloatingPoint);