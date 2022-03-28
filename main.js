const formData = document.getElementById("addBookForm");
const submitButton = formData.querySelector("button[type='submit']");
const titleInput = formData.querySelector("#title");
const authorInput = formData.querySelector("#author");
const pagesInput = formData.querySelector("#pages");
const readCheckbox = formData.querySelector("#read");
const addBookButton = document.querySelector("#add-button");
const formDiv = document.querySelector("#div-form");

submitButton.addEventListener('click', (e) => {
  const validCheck = checkValid(titleInput.value, authorInput.value, pagesInput.value);
  if (validCheck === true) {
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readCheckbox.checked);
    toggleForm();
    showBooks();
  }
})

addBookButton.addEventListener('click', (e) => toggleForm())

let bookArray = [{
  title: "Testing",
  author: "Clint Stevens",
  pages: 240,
  read: false
}];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary (title, author, pages, read) {
  const book = new Book(titleInput.value, authorInput.value, pagesInput.value, readCheckbox.checked);
  bookArray.push(book);
  showBooks();
}

const toggleForm = () => {
  if (formDiv.classList.contains('form-div')) {
    formDiv.classList.remove('form-div');
    formDiv.classList.add('form-div-visible');
  } else {
    formDiv.classList.remove('form-div-visible');
    formDiv.classList.add('form-div');
  }
}

const showBooks = (bookArray) => {
  bookArray.forEach((book) => {

  })
}

const checkValid = (title, author, pages) => {
  if (bookArray.indexOf(title) !== -1) {
    return false;
  }

  if (!author) {
    return false;
  }

  if (!pages) {
    return false;
  }

  return true;
}
