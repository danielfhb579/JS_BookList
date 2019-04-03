class Book{
    constructor(title,author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book){
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

    showAlert(message, className){
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

    deleteBook(target){
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
    
}

// Local Storage
class Store{
    static getBooks(){
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function (book) {
            const ui = new UI;

            // add book ui 
            ui.addBookToList(book);
        });
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn){

        const books = Store.getBooks();

        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index,1);
            }
            
        });
        
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

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
        //add to local Storage
        Store.addBook(book);

        //show alert
        ui.showAlert('Book Added!', 'success');

        //clear fields ui
        ui.clearFields();
    }

    e.preventDefault();
}


function deleteBook(e){

    const ui = new UI();

    //delete book
    ui.deleteBook(e.target);
    //delete from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //show message
    ui.showAlert('Book removed!', 'success');

    e.preventDefault();
}

