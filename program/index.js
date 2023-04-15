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

const myLibrary = [];

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
    const title2 = document.querySelector('#title');
    const author2 = document.querySelector('#author');
    const number2 = document.querySelector('#pages');
    let read2;
    // eslint-disable-next-line no-unneeded-ternary
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
})

document.addEventListener('click', (e) => {
    let card;
        if (e.target.className === 'read' || e.target.className === 'unread') {
        card = e.target.parentElement.parentElement;
        let target;
        myLibrary.forEach(book => {
            if (book.title === card.querySelector('p').textContent)
                    target = book;
            })
            target.toggle();
            card.remove();
            loadBook(target);
        }
})