// let modal = document.getElementById("modalAdd")

// let btn = document.getElementById("addButton")

// let close = document.getElementById('closeModal') 

// btn.onclick = function (){
//     modal.style.display = 'block'
// }

// close.onclick = function(){
//     modal.style.display = 'none'
// }

// close.onclick = function(){
//     modal.style.display = "none"
// }

// let modal = document.getElementById('modalAdd');
// let overlay = document.getElementById('overlay');
// let btn = document.getElementById('addButton');
// let closeModal = document.getElementById('closeModal');

// // Функция для открытия модального окна и отображения затемнения
// function openModal() {
//     modal.style.display = 'block';
//     overlay.style.display = 'block'; // Показываем затемнение
// }

// // Функция для закрытия модального окна и скрытия затемнения
// function closeModalFunc() {
//     modal.style.display = 'none';
//     overlay.style.display = 'none'; // Скрываем затемнение
// }

// // Открываем модальное окно при клике на кнопку
// btn.onclick = openModal;

// // Закрываем модальное окно при клике на кнопку закрытия
// closeModal.onclick = closeModalFunc;

// // Также можно закрывать окно при клике на затемнение
// overlay.onclick = closeModalFunc;



// let modal = document.getElementById('modalAdd');
// let overlay = document.getElementById('overlay');
// let btn = document.getElementById('addButton');
// let closeModal = document.getElementById('closeModal');

// // Функция для открытия модального окна
// function openModal() {
//     modal.classList.add('show');  // Добавляем класс "show" для отображения модального окна с анимацией
//     overlay.style.display = 'block'; // Показываем затемнение
// }

// // Функция для закрытия модального окна
// function closeModalFunc() {
//     modal.classList.remove('show');  // Убираем класс "show" для плавного уменьшения
//     setTimeout(() => {
//         overlay.style.display = 'none'; // Скрываем затемнение через 300ms после окончания анимации
//     }, 300);  // Задержка соответствует длительности анимации в CSS
// }

// // Открываем модальное окно при клике на кнопку
// btn.onclick = openModal;

// // Закрываем модальное окно при клике на кнопку закрытия
// closeModal.onclick = closeModalFunc;

// // Также можно закрывать окно при клике на затемнение
// overlay.onclick = closeModalFunc;






















const myLibrary = [];

// Конструктор для создания новых книг
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Функция для добавления книги в библиотеку
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

// Функция для отображения книг на странице
function displayBooks() {
  const bookGrid = document.getElementById('bookGrid'); // Контейнер для книг
  
  // Очищаем содержимое перед добавлением новых книг
  bookGrid.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book-card');
    bookDiv.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: <span class="read-status">${book.read ? 'Read' : 'Not Read'}</span></p>
      <button class="toggle-read" data-index="${index}">Toggle Read Status</button>
      <button class="remove-book" data-index="${index}">Remove</button>
    `;
    bookGrid.appendChild(bookDiv);
  });

  addEventListeners();
}

// Добавляем события для удаления и изменения статуса книг
function addEventListeners() {
  document.querySelectorAll('.remove-book').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      myLibrary.splice(index, 1);
      displayBooks();
    });
  });

  document.querySelectorAll('.toggle-read').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      myLibrary[index].read = !myLibrary[index].read;
      displayBooks();
    });
  });
}

// Управление модальным окном
const addButton = document.getElementById('addButton');
const modal = document.getElementById('modalAdd');
const overlay = document.getElementById('overlay');
const closeModal = document.getElementById('closeModal');

// Открытие модального окна
addButton.addEventListener('click', () => {
  modal.classList.add('show');
  overlay.style.display = 'block';
});

// Закрытие модального окна
closeModal.addEventListener('click', () => {
  modal.classList.remove('show');
  overlay.style.display = 'none';
});

// Закрытие модального окна при нажатии на оверлей
overlay.addEventListener('click', () => {
  modal.classList.remove('show');
  overlay.style.display = 'none';
});

// Форма для добавления новой книги
const form = document.querySelector('.add-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Получаем данные из формы
  const title = form.querySelector('input[placeholder="Title"]').value;
  const author = form.querySelector('input[placeholder="Author"]').value;
  const pages = form.querySelector('input[placeholder="Pages"]').value;
  const read = form.querySelector('input[type="checkbox"]').checked;
  
  if (title && author && pages) {
    addBookToLibrary(title, author, pages, read);  // Добавляем книгу в библиотеку
    
    // Закрываем модальное окно после добавления книги
    modal.classList.remove('show');
    overlay.style.display = 'none';
    
    form.reset();  // Сбрасываем поля формы
  } else {
    alert('Please fill out all fields');  // Оповещаем пользователя, если не все поля заполнены
  }
});
