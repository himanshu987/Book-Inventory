class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }

}

class UI {
  // ADD BOOK
  addBookToList(book) {
    const list = document.querySelector('#book-list');
    // Create a tr element
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `
    list.appendChild(row);
  }

  showAlert(message, className) {
    
    const div = document.createElement('div');

    div.className = `alert ${className}`;
    div.innerText = message;
    // Get parent
    const container = document.querySelector('.container');
    // Get element to insert it before
    const form = document.querySelector('#book-form');
    // Insert element
    container.insertBefore(div, form);
    
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 2000);

  }  

  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }


}

//  EVENT FOR ADD BOOK

document.querySelector('#book-form').addEventListener('submit', function(e) {
  
  // Get form values
  const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;
  
  // Instantiate book
  const book = new Book (title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validade
  if(title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);
    // Show success alert
    ui.showAlert('Book Added!!', 'success');
    // Clear fields
    ui.clearFields();

  }

  e.preventDefault();
})

// EVENT TO REMOVE BOOK

document.querySelector('#book-list').addEventListener('click', function(e) {
  // Instantiate UI
  const ui = new UI();
  
  // Delete book
  ui.deleteBook(e.target);
  
  // Show message
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault()
})