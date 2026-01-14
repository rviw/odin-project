const MAX_DIGITS = 10;

const KEY_OPERATOR_MAP = {
    "+": "+",
    "-": "−",
    "*": "×",
    "/": "÷"
}

let displayValue = "0";
let firstOperand = null;
let currentOperator = null;
let waitingForSecondOperand = false;
let justCalculated = false;

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }

function operate(operator, num1, num2) {
    switch (operator) {
        case "+": return add(num1, num2);
        case "−": return subtract(num1, num2);
        case "×": return multiply(num1, num2);
        case "÷": return divide(num1, num2);
    }
}

function updateDisplay() {
    document.querySelector(".display").textContent = displayValue;
}

function setError() {
    displayValue = "ERR";
    firstOperand = null;
    currentOperator = null;
    waitingForSecondOperand = false;
    justCalculated = false;
    updateDisplay();
}

function appendDigit(digit) {
    if (displayValue === "ERR") return;

    if (waitingForSecondOperand || justCalculated) {
        displayValue = digit;
        waitingForSecondOperand = false;
        justCalculated = false;
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

    if (waitingForSecondOperand || justCalculated) {
        displayValue = "0.";
        waitingForSecondOperand = false;
        justCalculated = false;
        updateDisplay();
        return;
    }

    if (!displayValue.includes(".")) {
        displayValue += ".";
        updateDisplay();
    }
}

function calculate(secondOperand) {
    const result = operate(currentOperator, firstOperand, secondOperand);

    if (!Number.isFinite(result)) {
        setError();
        return null;
    }

    const formatted = formatResult(result);
    if (formatted == "ERR") {
        setError();
        return null;
    }

    displayValue = formatted;
    return result;
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (currentOperator && !waitingForSecondOperand) {
        const result = calculate(inputValue);
        if (result === null) return;
        firstOperand = result;
        justCalculated = true;
    } else if (firstOperand === null) {
        firstOperand = inputValue;
    }

    currentOperator = nextOperator;
    waitingForSecondOperand = true;
    updateDisplay();
}

function handleEquals() {
    if (currentOperator === null || waitingForSecondOperand) return;

    const inputValue = parseFloat(displayValue);
    const result = calculate(inputValue);
    if (result === null) return;

    firstOperand = result;
    currentOperator = null;
    waitingForSecondOperand = false;
    justCalculated = true;
    updateDisplay();
}

function formatResult(value) {
    const [intPart, decPart] = String(value).split(".");

    if (intPart.length >= MAX_DIGITS && decPart) return "ERR";
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
    } else if (displayValue.length === 1 || justCalculated) {
        displayValue = "0";
        justCalculated = false;
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
    justCalculated = false;
    updateDisplay();
}

function activateButton(key) {
    const btn = document.querySelector(`button[data-key="${key}"]`);
    if (!btn) return;
    btn.classList.add("active");
}

function deactivateButton(key) {
    const btn = document.querySelector(`button[data-key="${key}"]`);
    if (!btn) return;
    btn.classList.remove("active");
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

document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (key >= "0" && key <= "9") {
        appendDigit(key);
        activateButton(key);
        return;
    }

    if (key === ".") {
        addFloatingPoint();
        activateButton(key);
        return;
    }

    if (key in KEY_OPERATOR_MAP) {
        handleOperator(KEY_OPERATOR_MAP[key]);
        activateButton(key);
        return;
    }

    if (key === "Enter" || key === "=") {
        e.preventDefault();
        handleEquals();
        activateButton("Enter");
        return;
    }

    if (key === "Backspace") {
        backspace();
        activateButton(key);
        return;
    }

    if (key === "Escape") {
        clearCalculator();
        activateButton(key);
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "=") {
        deactivateButton("Enter");
    } else {
        deactivateButton(e.key);
    }
});