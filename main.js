//Element Assignment
const formData = document.getElementById("addBookForm");
const submitButton = formData.querySelector("button[type='button']");
const titleInput = formData.querySelector("#title");
const authorInput = formData.querySelector("#author");
const pagesInput = formData.querySelector("#pages");
const readCheckbox = formData.querySelector("#read");
const addBookButton = document.querySelector("#add-button");
const formDiv = document.querySelector("#div-form");
const checkboxDiv = formData.querySelector("#checkbox-div");
const bookList = document.querySelector(".book-list");
const readButtons = document.querySelector(".read-unread");
const removeButtons = document.querySelector(".remove-button")

//Event Listeners for submit and form buttons
submitButton.addEventListener('click', (e) => {
  const validCheck = checkValid(titleInput.value, authorInput.value, pagesInput.value);
  if (validCheck) {
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readCheckbox.checked);
    toggleForm();
  }
})

addBookButton.addEventListener('click', (e) => toggleForm());

let bookArray = [];

//Error creation in submit form
let errorDiv = document.createElement('div');
let errorMessage = document.createElement('p');
const errorIcon = document.createElement('img');
errorIcon.src = "img/error.png";
errorIcon.classList.add("icon");
errorDiv.appendChild(errorIcon);
errorDiv.appendChild(errorMessage);
errorDiv.classList.add("form-div", "error", "error-flex");
checkboxDiv.after(errorDiv);

//Book Constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

//Adds book to array and runs card creation function
function addBookToLibrary (title, author, pages, read) {
  const book = new Book(titleInput.value, authorInput.value, pagesInput.value, readCheckbox.checked);
  bookArray.push(book);
  showBooks(bookArray);
}

const toggleForm = () => {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readCheckbox.checked = false;
  if (formDiv.classList.contains('form-div')) {
    formDiv.classList.remove('form-div');
    errorDiv.classList.add("form-div");
    formDiv.classList.add('form-div-visible');
  } else {
    formDiv.classList.remove('form-div-visible');
    formDiv.classList.add('form-div');
  }
}

const toggleButtons = (button) => {
  if (button.classList.contains('read-button')) {
    button.classList.remove('read-button');
    button.classList.add('unread-button');
    button.textContent = "Not read"
  } else {
    button.classList.remove('unread-button');
    button.classList.add('read-button');
    button.textContent = "Read"
  }
}

const removeBook = (div, title) => {
  console.log(div, title)

  const index = bookArray.findIndex((book) => book.title === title);

  bookArray.splice(index, 1);
  div.remove()
  console.log(bookArray);
}

//Creates cards based on book array
const showBooks = (array) => {
  const length = bookArray.length - 1;
  const title = bookArray[length].title;

  const div = document.createElement('div');
  div.classList.add("card") 

  const pTitle = document.createElement('p');
  pTitle.classList.add("title-text");
  pTitle.textContent = `"${bookArray[length].title}"` 

  const pAuthor = document.createElement('p');
  pAuthor.classList.add("author-text");
  pAuthor.textContent = `${bookArray[length].author}`

  const pPage = document.createElement("p");
  pPage.textContent = `${bookArray[length].pages} pages`

  const readButton = document.createElement("button");

  if (bookArray[length].read === false) {
    readButton.classList.add("unread-button");
    readButton.textContent = "Not Read";
    readButton.classList.add("read-unread");
  } else if (bookArray[length].read === true) {
    readButton.classList.add("read-button");
    readButton.textContent = "Read";
    readButton.classList.add("read-unread");
  }

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-button");
  removeButton.textContent = "Remove"

  readButton.addEventListener('click', (e) => toggleButtons(readButton));;
  removeButton.addEventListener('click', (e) => removeBook(div, title));

  div.appendChild(pTitle);
  div.appendChild(pAuthor);
  div.appendChild(pPage);
  div.appendChild(readButton);
  div.appendChild(removeButton) 

  bookList.appendChild(div);
}

//Submit form validation
const checkValid = (title, author, pages) => {
  let pageNumber = parseInt(pages);
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
  } else if (pageNumber >= 10000) {
    errorMessage.textContent = "Page limit reached!"
    errorDiv.classList.remove('form-div');
    return false;
  }

  return true;
}
