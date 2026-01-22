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

        const actionsCell = document.createElement('td');
        actionsCell.classList.add('table-actions');

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.classList.add('action-btn');
        removeBtn.dataset.action = 'remove';
        removeBtn.innerHTML = `
          <svg viewBox="0 0 24 24">
            <path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
          </svg>
        `;
        removeBtn.setAttribute('aria-label', 'Remove book');

        actionsCell.appendChild(removeBtn);

        row.append(titleCell, authorCell, pagesCell, statusCell, actionsCell);
        libraryBody.appendChild(row);
    });
}

addBookToLibrary('The Myth of Normal', 'Gabor Mate', 576, true);
addBookToLibrary('Why We Sleep', 'Matthew Walker', 368, false);

renderLibrary();

const newBookBtn = document.getElementById('new-book-btn');
const dialog = document.getElementById('book-dialog');
const form = document.getElementById('book-form');
const closeBtn = document.getElementById('close-dialog');
const cancelBtn = document.getElementById('cancel-dialog');

function openDialog() {
    if (typeof dialog.showModal === 'function') {
        dialog.showModal();
        form.querySelector('#title').focus();
    } else {
        dialog.setAttribute('open', '');
        form.querySelector('#title').focus();
    }
}

function closeDialog() {
    form.reset();
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
}

newBookBtn.addEventListener('click', openDialog);
closeBtn.addEventListener('click', closeDialog);
cancelBtn.addEventListener('click', closeDialog);

dialog.addEventListener('click', (e) => {
    if (e.target === dialog) closeDialog();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = form.querySelector('#title').value.trim();
    const author = form.querySelector('#author').value.trim();
    const pages = Number(form.querySelector('#pages').value);
    const isRead = form.querySelector('#is-read').checked;

    if (!title || !author || !Number.isFinite(pages) || pages < 1) return;

    addBookToLibrary(title, author, pages, isRead);
    renderLibrary();
    closeDialog;
});

function removeBookFromLibraryById(id) {
    const index = myLibrary.findIndex((book) => book.id === id);
    if (index === -1) return;
    myLibrary.splice(index, 1);
}

libraryBody.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;

    const row = button.closest('tr[data-id]');
    if (!row) return;

    const id = row.dataset.id;

    if (button.dataset.action === 'remove') {
        removeBookFromLibraryById(id);
        renderLibrary();
    }
});