function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggle = function() {
    if (this.read)
        this.read = false;
    else
        this.read = true;
}

let myLibrary = [];
const addButton = document.querySelector('.add');
const modal = document.querySelector('.popup');
const closeModal = document.querySelector('.close');
const form = document.querySelector('form');
const totalBooks = document.querySelector('#total');
const leftBooks = document.querySelector('#left');
const pagesRead = document.querySelector('#pagesRead');

function updateTotalBooks() {
    totalBooks.textContent =  `Total books: ${myLibrary.length}`;
}

function updateLeftBooks() {
    let counter = 0;
    myLibrary.forEach(book => {
        if (!book.read)
            counter += 1;
    })
    leftBooks.textContent = `Books left: ${counter}`;
}

function updatePagesRead() {
    let counter = 0;
    myLibrary.forEach(book => {
        if (book.read)
            counter += Number(book.pages);
    })
    pagesRead.textContent = `Total pages read: ${counter}`;
}

function updateSidebar() {
    updateTotalBooks();
    updateLeftBooks();
    updatePagesRead();
}

function loadBook(book) {
    const card = document.createElement('div');
        card.classList = 'card';
        const info = document.createElement('div');
        info.classList = 'info';
        const title = document.createElement('p');
        title.textContent = book.title;
        const author = document.createElement('p');
        author.textContent = book.author;
        const pages = document.createElement('p');
        pages.textContent = book.pages;
        info.appendChild(title);
        info.appendChild(author);
        info.appendChild(pages);
        card.appendChild(info);
        const buttons = document.createElement('div');
        buttons.classList = 'buttons';
        const read = document.createElement('button');
        read.classList = book.read ? 'read' : 'unread';
        read.textContent = read.className === 'read' ? 'READ' : 'NOT READ';
        const remove = document.createElement('button');
        remove.classList = 'remove';
        remove.textContent = 'REMOVE';
        buttons.appendChild(read);
        buttons.appendChild(remove);
        card.appendChild(buttons);
        card.classList = 'card';
        document.querySelector('.books').appendChild(card);
        updateSidebar();
}


function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    loadBook(book);
}


function loadBooks() {
    myLibrary.forEach(book => {
        loadBook(book);
    })
}

addButton.addEventListener('click', () => {
    modal.style.display = 'block';
    if (modal.querySelector('.warning')) {
        modal.querySelector('.warning').remove();
    }
})
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
})

window.onclick = (e) => {
    if (e.target === modal)
        modal.style.display = 'none';
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title2 = document.querySelector('#title');
    let execute = true;
    myLibrary.forEach(book => {
        if (book.title === title2.value)
            execute = false;
    })
    setTimeout(() => {
        if (execute) {
            const author2 = document.querySelector('#author');
            const number2 = document.querySelector('#pages');
            let read2;
            if (document.querySelector('#read').checked)
                read2 = true;
            else
                read2 = false;
            addBookToLibrary(title2.value, author2.value, number2.value, read2);
            modal.style.display = 'none';
            title2.value = '';
            author2.value = '';
            number2.value = '';
            document.querySelector('#read').checked = false;
            updateSidebar();
        }
        else {
            if (title2.parentElement.querySelector('.warning')) {
                title2.parentElement.querySelector('.warning').remove();
            }
            const warning = document.createElement('p');
            warning.className = 'warning';
            warning.textContent = 'You have already added this book.';
            warning.style.color = '#FF9999';
            warning.style.fontSize = '13px';
            title2.parentElement.style.marginTop = '0px';
            title2.parentElement.append(warning);
        }
    }, 0)
})

document.addEventListener('click', (e) => {
    const card = e.target.parentElement.parentElement;
        if (e.target.className === 'read' || e.target.className === 'unread') {
            let target;
            myLibrary.forEach(book => {
                if (book.title === card.querySelector('p').textContent)
                        target = book;
                })
                target.toggle();
                e.target.className = target.read ? 'read' : 'unread';
                e.target.textContent = target.read ? 'READ' : 'UNREAD'
                updateSidebar();
            }
        else if (e.target.className === 'remove') {
            card.remove(); 
            // eslint-disable-next-line consistent-return, array-callback-return
            myLibrary = myLibrary.filter((book) => {
                if (book.title !== card.querySelector('p').textContent)
                    return book;
            })
            updateSidebar(); 
            }
})

document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
    updateSidebar();
})

