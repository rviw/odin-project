const container = document.querySelector('.grid-container');
const button = document.getElementById('resize-button');

function createGrid(squaresPerSide) {
    container.innerHTML = '';

    const totalSquares = squaresPerSide * squaresPerSide;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');

        square.style.flex = `1 0 calc(100% / ${squaresPerSide})`;

        square.addEventListener('mouseenter', () => {
            square.style.backgroundColor = 'blue';
        });

        container.appendChild(square);
    }
}

createGrid(16);

button.addEventListener('click', () => {
    let squaresPerSide = prompt("Enter number of squares per side (max 100):");

    squaresPerSide = parseInt(squaresPerSide);

    if (squaresPerSide >= 1 && squaresPerSide <= 100) {
        createGrid(squaresPerSide);
    }
})