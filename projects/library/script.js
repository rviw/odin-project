const myLibrary = [];

function Book(id, title, author, pages, isRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
    const id = crypto.randomUUID();
    const newBook = new Book(id, title, author, pages, isRead);
    myLibrary.push(newBook);
}