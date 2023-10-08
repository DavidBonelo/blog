const myLibrary = [];
const libraryContainer = document.querySelector(".library");
const bookForm = document.getElementById("book-form");
const bookDialog = document.getElementById("dialog");
const addBookBtn = document.getElementById("add-book");
const saveBookBtn = document.getElementById("save-book");
const pagesInput = document.getElementById("pages");
const totalPagesInput = document.getElementById("totalPages");

function Book(title, author, pagesTotal, pagesRead, haveRead) {
  this.id = window.crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pagesTotal = pagesTotal;
  this.pagesRead = pagesRead;
  this.haveRead = haveRead;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pagesTotal} pages,
  ${this.haveRead ? "already read" : "not read yet"}
  `;
};

Book.prototype.toogleRead = function () {
  this.haveRead = !this.haveRead;
  return this.haveRead;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
  libraryContainer.appendChild(buildBookElement(book));
}

function deleteBook(bookElement) {
  const bookId = bookElement.getAttribute("data-bookid");
  const bookIdx = myLibrary.findIndex((book) => book.id === bookId);
  myLibrary.splice(bookIdx, 1);
  // document.querySelector(`[data-bookid="${bookId}"]`).remove();
  bookElement.remove();
}

function loadBooks() {
  libraryContainer.replaceChildren();
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    libraryContainer.appendChild(buildBookElement(book));
  }
}

function buildBookElement(book) {
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
  deleteBtn.onclick = (e) => deleteBook(bookElement);
  bookElement.appendChild(deleteBtn);

  return bookElement;
}

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(bookForm).entries();
  const formDataObj = Object.fromEntries(formData);
  console.log(formDataObj);
  let { title, author, pages, totalPages, read } = formDataObj;
  read = read == "1" ? true : false;
  const book = new Book(title, author, totalPages, pages, read);
  addBookToLibrary(book);
  bookDialog.close();
}

addBookBtn.onclick = () => bookDialog.showModal();

const setMaxPages = () => pagesInput.setAttribute("max", totalPagesInput.value);
setMaxPages();
totalPagesInput.onchange = setMaxPages;

bookForm.onsubmit = handleSubmit;

const buk = new Book("Kuma bear", "some random", 230, 8, true);
addBookToLibrary(buk);

const buk2 = new Book("Interstelar", "other random", 230, 5, true);
addBookToLibrary(buk2);
const buk3 = new Book("Muchocu tenzey", "rufuyin mangote", 230, 5, false);
addBookToLibrary(buk3);

// bookDialog.showModal();
// loadBooks();
