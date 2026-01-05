const container = document.querySelector(".grid-container");
const button = document.getElementById("resize-button");

function getRandomColor() {
    const r = Math.floor(Math.random() * 256); // 0~255
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function createGrid(squaresPerSide) {
    container.innerHTML = "";

    const totalSquares = squaresPerSide * squaresPerSide;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement("div");
        square.classList.add("grid-square");

        square.style.flex = `1 0 calc(100% / ${squaresPerSide})`;

        const baseColor = getRandomColor();

        square.addEventListener("mouseenter", () => {
            let currentOpacity = parseFloat(square.style.opacity) || 0;
            if (currentOpacity < 1) {
                currentOpacity += 0.1;
                square.style.opacity = currentOpacity;
                square.style.backgroundColor = baseColor;
            }
        });

        container.appendChild(square);
    }
}

createGrid(16);

button.addEventListener("click", () => {
    let squaresPerSide = prompt("Enter number of squares per side (max 100):");

    squaresPerSide = parseInt(squaresPerSide);

    if (squaresPerSide >= 1 && squaresPerSide <= 100) {
        createGrid(squaresPerSide);
    }
})