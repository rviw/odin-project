const myLibrary = [];

function Book(id, title, author, pages, isRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.toggleRead = function () {
    this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, pages, isRead) {
    const id = crypto.randomUUID();
    const newBook = new Book(id, title, author, pages, isRead);
    myLibrary.push(newBook);
}

const libraryBody = document.getElementById('library');

function renderLibrary() {
    libraryBody.innerHTML = '';

    myLibrary.forEach((book) => {
        const row = document.createElement('tr');
        row.dataset.id = book.id;

        const titleCell = document.createElement('td');
        titleCell.textContent = book.title;

        const authorCell = document.createElement('td');
        authorCell.textContent = book.author;

        const pagesCell = document.createElement('td');
        pagesCell.textContent = String(book.pages);
        pagesCell.classList.add('col-num');

        const statusCell = document.createElement('td');

        const statusWrap = document.createElement('span');
        statusWrap.classList.add('status');
        statusWrap.dataset.read = String(book.isRead);

        const dot = document.createElement('span');
        dot.classList.add('status-dot');
        dot.setAttribute('aria-hidden', 'true');

        const label = document.createElement('span');
        label.textContent = book.isRead ? 'Read' : 'Not read';

        statusWrap.append(dot, label);
        statusCell.appendChild(statusWrap);

        row.append(titleCell, authorCell, pagesCell, statusCell);
        libraryBody.appendChild(row);
    });
}

addBookToLibrary('The Myth of Normal', 'Gabor Mate', 576, true);
addBookToLibrary('Why We Sleep', 'Matthew Walker', 368, false);

renderLibrary();