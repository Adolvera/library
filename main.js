const formData = document.getElementById("addBookForm");
const submitButton = formData.querySelector("button[type='button']");
const titleInput = formData.querySelector("#title");
const authorInput = formData.querySelector("#author");
const pagesInput = formData.querySelector("#pages");
const readCheckbox = formData.querySelector("#read");
const addBookButton = document.querySelector("#add-button");
const formDiv = document.querySelector("#div-form");
const checkboxDiv = formData.querySelector("#checkbox-div");

submitButton.addEventListener('click', (e) => {
  const validCheck = checkValid(titleInput.value, authorInput.value, pagesInput.value);
  if (validCheck) {
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

let errorDiv = document.createElement('div');
let errorMessage = document.createElement('p');
const errorIcon = document.createElement('img');
errorIcon.src = "img/error.png";
errorIcon.classList.add("icon");
errorDiv.appendChild(errorIcon);
errorDiv.appendChild(errorMessage);
errorDiv.classList.add("form-div", "error", "error-flex");
checkboxDiv.after(errorDiv);

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
}

const checkValid = (title, author, pages) => {
  const repeatName = bookArray.some(book => book.title === title);
  errorDiv.classList.add("form-div");
  if (title === "") {
    errorMessage.textContent = "Please enter a title"
    errorDiv.classList.remove("form-div");
    return false;
  } else if (repeatName) {
    errorMessage.textContent = "Title has already been used"
    errorDiv.classList.remove("form-div");
    return false;
  } else if (!author) {
    errorMessage.textContent = "Please enter an author"
    errorDiv.classList.remove("form-div");
    return false;
  } else if (pages === "0" || pages === "") {
    errorMessage.textContent = "Please insert amount of pages"
    errorDiv.classList.remove("form-div");
    return false;
  }
  
  return true;
}
