const popup = document.querySelector('.popup_type_profile'); // попап-профиль
const openPopup = document.querySelector('.profile__button-edit'); // Открыть попап-профиль
const closePopup = document.querySelector('.popup__close_type_profile'); // Закрыть попап-профиль


let nameOutput = document.querySelector('.profile__name'); // имя профиля
let jobOutput = document.querySelector('.profile__description'); // подпись профиля

let formElement = document.querySelector('.popup__form_type_profile'); // форма попап-профиля
let nameInput = document.querySelector('.popup__text_type_name'); // поле ввода попап-профиля имя
let jobInput = document.querySelector('.popup__text_type_job'); // поле вводу попап-профиля подписи

const openPopupCard = document.querySelector('.profile__button-add'); // кнопка добавления картчоки
const popupCard = document.querySelector('.popup_type_card'); // попап-карточки
const closePopupCard = document.querySelector('.popup__close_type_card'); // Закрыть попап-карточки
let placeNameOutput = document.querySelector('.popup__text_type_place-name'); // имя профиля
let urlOutput = document.querySelector('.popup__text_type_url'); // подпись профиля
let formElementCard = document.querySelector('.popup__form_type_card'); // форма попап-карточки

const cards = document.querySelector('.cards'); // список карточек
const cardTemplate = document.querySelector('.card-template'); // подгружаем форму карточки

/////////////////////////////////////
// Массив карточек для добавления
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/////////////////////////////////////
// Функция добавления 6 карточек с данными из массива
initialCards.forEach(function (item) { //массив / для каждого/ функция (элемент массива)
  const card = cardTemplate.content.cloneNode(true); //постоянная кард = копируем контент из темплейта
  card.querySelector('.card__block-title').textContent = item.name; // в кард вставляем тест из элемента массива ищем по ключу значение
  card.querySelector('.card__picture').setAttribute("src", item.link); // в кард вставляем ссылку в атрибут тега из элемента массива ищем по ключу значение
  cards.append(card) // в карточки вставляем карточку
});


/////////////////////////////////////
// Функция открытия попапа-профиля и функция закрытия, функция сохранения данных из попапа-профиля в профиль

function startPopup() { //функция открытия попапа
  popup.classList.add('popup_opened'); //попапу добавляется класс открытия (всплытия)
  nameInput.value = nameOutput.textContent; // в инпут имени присваивается значение со страницы
  jobInput.value = jobOutput.textContent; // в инпут работы присваивается значение со страницы
}

function endPopup() { //функция закрытия попапа
  popup.classList.remove('popup_opened'); // удаляется класс у попапа
}

function formSubmitHandler(evt) { //функция нажатия кнопки сохранить
  evt.preventDefault(); //отменяет стандартное действие на кнопку
  nameOutput.textContent = nameInput.value; // на страницу присваивается значение из инпута
  jobOutput.textContent = jobInput.value; // на страницу присваивается значение из инпута
  endPopup() //вызов функции закрытия попапа
}

openPopup.addEventListener('click', startPopup); //добавляем слушателя события кнопке открытия попапа
closePopup.addEventListener('click', endPopup); //добавляем слушателя события кнопке закрытия попапа
formElement.addEventListener('submit', formSubmitHandler); //добавляем слушателя события кнопке формы сохранения данных 

/////////////////////////////////////
// Кнопка лайк

let likes = document.querySelectorAll('.card__block-button');//переменная лайкс выбирает все кнопки

function likeActive(evt) { // функция с параметром события
  evt.target.classList.toggle('card__block-button_active');// на что нажали - меняем класс
}

likes.forEach((like) => { // что сделать с каждой кнопкой 
  like.addEventListener('click', likeActive); // добавить слушателя для каждой кнопки - на клик срабатывает функция
})

/////////////////////////////////////
// Кнопка удалить карточку

let trashButtons = document.querySelectorAll('.card__trash-button'); // Кнопки удалить карточку

trashButtons.forEach((trashButton) => { // кнопки / что сделать с каждой кнопкой 
  trashButton.addEventListener('click', removeCard) // одна кнопка - добавить слушателя  - на клик срабатывает функция 
})

function removeCard(evt) { //функция удаления карточки
  evt.target.parentElement.remove();// событие нажатия удалить родительский элемент
}

/////////////////////////////////////
// Открытие попапа добавления карточки

function startPopupCard() { // функция открытия формы добавления карточки
  popupCard.classList.add('popup_opened'); // добавление класса открытия попапа
}

openPopupCard.addEventListener('click', startPopupCard); // добавляем слушателя события по клику запуская функцию

function endPopupCard() { // функция закрытия формы добавления карточки
  popupCard.classList.remove('popup_opened'); // удаление класса открытия (всплытия) попапа
}

closePopupCard.addEventListener('click', endPopupCard); // добавляем слушателя события для закрытия попапа по клику

/////////////////////////////////////
// Добавить открытие фул-скрин попапа с картинкой
//
let cardPictures = document.querySelectorAll('.card__picture'); // все картинки в карточках
const closeFullScreen = document.querySelector('.popup__close_type_full'); // кнопка закрыть попап-картинки

cardPictures.forEach((cardPicture) => { //карточки картинок для каждой сделать
  cardPicture.addEventListener('click', openFullScreen); //картинке добавить слушателя по клику выполнить функцию открытия
})

const popupFullScreen = document.querySelector('.popup_type_full') // фул-скрин попап-картинки

function openFullScreen(evt) { // функция по событию
  document.querySelector('.popup__fullscr-picture').setAttribute('src', evt.target.getAttribute('src')); // выбираем картинку в форме и добавляем атрибут в срс из выбранной по клику картинки из атрибута срс
  document.querySelector('.popup__fullscr-title').textContent = evt.target.parentNode.querySelector('.card__block-title').textContent; // выбираем поле текста и контенту присваиваем найденный по клику у родителя через селектор текст
  popupFullScreen.classList.add('popup_opened'); // добавляем класс для всплытия попапа
}

function endFullScreen() { // функция закрытия попапа
  popupFullScreen.classList.remove('popup_opened'); // удаляем класс всплытия у попапа
}

closeFullScreen.addEventListener('click', endFullScreen); // добавляем слушателя на кнопку закрытия попапа для выполнения функции по клику

/////////////////////////////////////
// Добавить карточку
//
function cardFormSubmitHandler(evt) { // функция добавления карточки и контента в неё
  const card = cardTemplate.content.cloneNode(true); // копируем содержимое темплейта в карточку (создаём шаблон)
  evt.preventDefault(); // отмена стандартного действия при нажатии кнопки
  card.querySelector('.card__block-title').textContent = popupCard.querySelector('.popup__text_type_place-name').value; // выбрать поле названия текст и присвоить значение из введённого в инпут значения
  card.querySelector('.card__picture').setAttribute("src", popupCard.querySelector('.popup__text_type_url').value); // выбрать поле картинки и атрибуту срс присвоить встравленное в инпут значение
  card.querySelector('.card__picture').addEventListener('click', openFullScreen); // назначить слушателя события по клику для открытия попапа
  card.querySelector('.card__trash-button').addEventListener('click', removeCard); // назначить слушателя осбытия по клику для кнопки удалить
  card.querySelector('.card__block-button').addEventListener('click', likeActive); // назначить слушателя события по клику для кнопки лайк
  cards.append(card) // в карточки вставляем карточку
  endPopupCard() //закрываем попап
  popupCard.querySelector('.popup__text_type_place-name').value = ''; // очищаем поле попапа после ввода
  popupCard.querySelector('.popup__text_type_url').value = ''; // очищаем поле попапа после ввода
}

formElementCard.addEventListener('submit', cardFormSubmitHandler); // назначаем слушателя события по нажатию кнопки создать