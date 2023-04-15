function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.read = function() {
    if (this.read)
        this.read = false;
    else
        this.read = true;
}

const myLibrary = [];



function loadBook(book) {
    const card = document.createElement('div');
        card.classList = 'card';
        const info = document.createElement('div');
        info.classList = 'info';
        const title = document.createElement('p');
        title.innerText = book.title;
        const author = document.createElement('p');
        author.innerText = book.author;
        const pages = document.createElement('p');
        pages.innerText = book.pages;
        info.appendChild(title, author, pages);
        card.appendChild(info);
        const buttons = document.createElement('div');
        buttons.classList = 'buttons';
        const read = document.createElement('button');
        read.classList = book.read ? 'read' : 'unread';
        const remove = document.createElement('remove');
        remove.classList = 'remove';
        buttons.appendChild(read, remove);
        card.appendChild(buttons);
}

function loadBooks() {
    myLibrary.forEach(book => {
        loadBook(book);
    })
}

const addButton = document.querySelector('.add');
const modal = document.querySelector('.popup');
const closeModal = document.querySelector('.close');
const form = document.querySelector('form');
document.addEventListener('DOMContentLoaded', loadBooks())

addButton.addEventListener('click', () => {
    modal.style.display = 'block';
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
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const number = document.querySelector('#pages').value;
    const read = document.querySelector('#read').value;
    // eslint-disable-next-line no-console
    addBook
})
