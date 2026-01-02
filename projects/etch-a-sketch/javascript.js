const container = document.querySelector('.grid-container');

for (let i = 0; i < 16 * 16; i++) {
    const square = document.createElement('div');
    square.classList.add('grid-square');

    square.addEventListener('mouseenter', () => {
        square.style.backgroundColor = 'blue';
    });

    container.appendChild(square);
}