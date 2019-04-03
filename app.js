//book constructor
function Book(title,author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//ui
function UI(){}

// add book to list    
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    //create element
    const row = document.createElement('tr');
    //insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href=# class = "delete">X<a></td>
    `;

    list.appendChild(row);
}



//show alerts
UI.prototype.showAlert = function (message, className){
    //create div
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    //get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);
    
    // set timeout
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

//delete book
UI.prototype.deleteBook = function(target){
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// ui clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//event listeners
document.getElementById('book-form').addEventListener('submit', submitBook);

document.getElementById('book-list').addEventListener('click', deleteBook);

//helpers
function submitBook(e){
    //get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    //instantiate book      
    const book = new Book(title,author,isbn);

    //instantiate UI
    const ui = new UI();

    //validate
    if (title === ''|| author === '' || isbn === '') {
        //error alert
        ui.showAlert('Please fill in all the fields', 'error');
    }else{
        // add book to list
        ui.addBookToList(book);

        //show alert
        ui.showAlert('Book Added!', 'success');

        //clear fields ui
        ui.clearFields();
    }

    e.preventDefault();
}


function deleteBook(e){

    const ui = new UI();

    ui.deleteBook(e.target);

    //show message
    ui.showAlert('Book removed!', 'success');

    e.preventDefault();
}


