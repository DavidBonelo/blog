class Book {
  id = window.crypto.randomUUID();
  constructor(title, author, pagesTotal, pagesRead, haveRead) {
    this.title = title;
    this.author = author;
    this.pagesTotal = pagesTotal;
    this.pagesRead = pagesRead;
    this.haveRead = haveRead;
  }
  info() {
    return `${this.title} by ${this.author}, ${this.pagesTotal} pages,
    ${this.haveRead ? "already read" : "not read yet"}`;
  }
  toogleRead() {
    this.haveRead = !this.haveRead;
    return this.haveRead;
  }
}

class LibraryController {
  #books = [];

  addBook(book) {
    this.#books.push(book);
  }

  deleteBook(bookId) {
    const bookIdx = this.#books.findIndex((book) => book.id === bookId);
    if (bookIdx == -1) return;
    this.#books.splice(bookIdx, 1);
  }

  get books() {
    return this.#books;
  }
}

class ScreenController {
  libraryController;

  libraryContainer = document.querySelector(".library");
  bookForm = document.getElementById("book-form");
  bookDialog = document.getElementById("dialog");
  addBookBtn = document.getElementById("add-book");
  saveBookBtn = document.getElementById("save-book");
  pagesInput = document.getElementById("pages");
  totalPagesInput = document.getElementById("totalPages");

  constructor(libraryController) {
    this.libraryController = libraryController;

    this.loadBooks();
    this.setMaxPages();
    this.bindEvents();
    // bookDialog.showModal();
  }

  loadBooks() {
    this.libraryContainer.replaceChildren();
    for (let i = 0; i < this.libraryController.books.length; i++) {
      const book = this.libraryController.books[i];
      this.libraryContainer.appendChild(this.buildBookElement(book));
    }
  }

  addBook(book) {
    this.libraryController.addBook(book);
    this.libraryContainer.appendChild(this.buildBookElement(book));
  }

  setMaxPages() {
    this.pagesInput.setAttribute("max", this.totalPagesInput.value);
  }

  bindEvents() {
    this.addBookBtn.onclick = () => this.bookDialog.showModal();
    this.totalPagesInput.onchange = this.setMaxPages.bind(this);
    this.bookForm.onsubmit = this.handleSubmit.bind(this);
  }

  buildBookElement(book) {
    console.log(book.id);
    const bookElement = document.createElement("div");
    bookElement.setAttribute("data-bookid", book.id);
    bookElement.className = "book";
    bookElement.innerHTML = `
          <p class="book-title">${book.title}</p>
          <p class="book-author">Author: ${book.author}</p>
          <p>${book.pagesRead}/${book.pagesTotal} pages</p>
          `;
    const readBtn = document.createElement("button");
    readBtn.classList.add("read-btn");
    readBtn.textContent = book.haveRead ? "✔ read" : "reading";
    if (book.haveRead) readBtn.classList.add("read");
    readBtn.onclick = () => {
      readBtn.classList.toggle("read");
      readBtn.textContent = book.toogleRead() ? "✔ read" : "reading";
    };
    bookElement.appendChild(readBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Book";
    deleteBtn.onclick = () => this.removeBook(bookElement);
    bookElement.appendChild(deleteBtn);

    return bookElement;
  }

  removeBook(bookElement) {
    const bookId = bookElement.getAttribute("data-bookid");
    this.libraryController.deleteBook(bookId);
    bookElement.remove();
    // document.querySelector(`[data-bookid="${bookId}"]`).remove();
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(this.bookForm).entries();
    const formDataObj = Object.fromEntries(formData);
    console.log(formDataObj);
    let { title, author, pages, totalPages, read } = formDataObj;
    read = read == "1" ? true : false;
    const book = new Book(title, author, totalPages, pages, read);
    this.addBook(book);
    this.bookDialog.close();
  }
}

const libraryController = new LibraryController();

const buk = new Book("Kuma bear", "some random", 230, 8, true);
libraryController.addBook(buk);
const buk2 = new Book("Interstelar", "other random", 230, 5, true);
libraryController.addBook(buk2);
const buk3 = new Book("Muchocu tenzey", "rufuyin mangote", 230, 5, false);
libraryController.addBook(buk3);

const screenController = new ScreenController(libraryController);
