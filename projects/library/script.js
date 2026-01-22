class Book {
    constructor({ id, title, author, pages, isRead }) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    toggleRead() {
        this.isRead = !this.isRead;
    }
}

class LibraryApp {
    constructor() {
        this.books = [];

        this.$libraryBody = document.getElementById('library');

        this.$newBookBtn = document.getElementById('new-book-btn');
        this.$dialog = document.getElementById('book-dialog');
        this.$form = document.getElementById('book-form');
        this.$closeBtn = document.getElementById('close-dialog');
        this.$cancelBtn = document.getElementById('cancel-dialog');

        this.bindEvents();
        this.seed();
        this.render();
    }

    bindEvents() {
        this.$newBookBtn.addEventListener('click', () => this.openDialog());
        this.$closeBtn.addEventListener('click', () => this.closeDialog());
        this.$cancelBtn.addEventListener('click', () => this.closeDialog());

        this.$dialog.addEventListener('click', (e) => {
            if (e.target === this.$dialog) this.closeDialog();
        });

        this.$form.addEventListener('submit', (e) => this.handleSubmit(e));

        this.$libraryBody.addEventListener('click', (e) => this.handleTableClick(e));
    }

    createId() {
        return crypto.randomUUID();
    }

    seed() {
        this.addBook({
            title: 'The Myth of Normal',
            author: 'Gabor Mate',
            pages: 576,
            isRead: true
        });

        this.addBook({
            title: 'Why We Sleep',
            author: 'Matthew Walker',
            pages: 368,
            isRead: false
        });
    }

    addBook( { title, author, pages, isRead }) {
        const book = new Book({
            id: this.createId(),
            title,
            author,
            pages,
            isRead,
        });
        this.books.push(book);
    }

    removeBookById(id) {
        const idx = this.books.findIndex((b) => b.id === id);
        if (idx === -1) return;
        this.books.splice(idx, 1);
    }

    findBookById(id) {
        return this.books.find((b) => b.id === id) ?? null;
    }

    openDialog() {
        const focusTitle = () => this.$form.querySelector('#title')?.focus();

        if (typeof this.$dialog.showModal === 'function') {
            this.$dialog.showModal();
            focusTitle();
        } else {
            this.$dialog.setAttribute('open', '');
            focusTitle();
        }
    }

    closeDialog() {
        this.$form.reset();
        if (typeof this.$dialog.close === 'function') this.$dialog.close();
        else this.$dialog.removeAttribute('open');
    }

    handleSubmit(e) {
        e.preventDefault();

        const title = this.$form.querySelector('#title').value.trim();
        const author = this.$form.querySelector('#author').value.trim();
        const pages = Number(this.$form.querySelector('#pages').value);
        const isRead = this.$form.querySelector('#is-read').checked;

        if (!title || !author || !Number.isFinite(pages) || pages < 1) return;

        this.addBook({ title, author, pages, isRead });
        this.render();
        this.closeDialog();
    }

    handleTableClick(e) {
        const actionEl = e.target.closest('[data-action]');
        if (!actionEl) return;

        const row = actionEl.closest('tr[data-id]');
        if (!row) return;

        const id = row.dataset.id;
        const book = this.findBookById(id);
        if (!book) return;

        const action = actionEl.dataset.action;

        if (action === 'toggle-read') {
            book.toggleRead();
            this.render();
            return;
        }

        if (action == 'remove') {
            this.removeBookById(id);
            this.render();
        }
    }

    createRow(book) {
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
        statusWrap.dataset.action = 'toggle-read';
        statusWrap.setAttribute(
            'aria-label',
            book.isRead ? 'Mark as unread' : 'Mark as read'
        );

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
        removeBtn.setAttribute('aria-label', 'Remove book');
        removeBtn.innerHTML = `
          <svg viewBox="0 0 24 24">
            <path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
          </svg>
        `;
        
        actionsCell.appendChild(removeBtn);

        row.append(titleCell, authorCell, pagesCell, statusCell, actionsCell);
        return row;
    }

    render() {
        this.$libraryBody.innerHTML = '';
        const frag = document.createDocumentFragment();

        this.books.forEach((book) => {
            frag.appendChild(this.createRow(book));
        });

        this.$libraryBody.appendChild(frag);
    }
}

new LibraryApp();