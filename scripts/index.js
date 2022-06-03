const profilePopup = document.querySelector('.popup_type_profile'); // попап-профиль
const profileOpenBtn = document.querySelector('.profile__button-edit'); // Открыть попап-профиль
const profileCloseBtn = document.querySelector('.popup__close_type_profile'); // Закрыть попап-профиль

const profileName = document.querySelector('.profile__name'); // имя профиля
const profileDescription = document.querySelector('.profile__description'); // подпись профиля

const profilePopupForm = document.querySelector('.popup__form_type_profile'); // форма попап-профиля
const profilePupupNameInput = document.querySelector('.popup__text_type_name'); // поле ввода попап-профиля имя
const profilePopupDescriptionInput = document.querySelector('.popup__text_type_job'); // поле вводу попап-профиля подписи

const btnAddCard = document.querySelector('.profile__button-add'); // кнопка добавления картчоки
const cardPopup = document.querySelector('.popup_type_card'); // попап-карточки
const cardPopupCloseBtn = document.querySelector('.popup__close_type_card'); // Закрыть попап-карточки
const cardPopupPlaceInput = document.querySelector('.popup__text_type_place-name'); // имя профиля
const cardPopupUrlInput = document.querySelector('.popup__text_type_url'); // подпись профиля
const cardPopupForm = document.querySelector('.popup__form_type_card'); // форма попап-карточки

const cards = document.querySelector('.cards'); // список карточек
const cardTemplate = document.querySelector('.card-template'); // подгружаем форму карточки

const fullscreenPopup = document.querySelector('.popup_type_full') // фул-скрин попап-картинки
const fullscreenPopupCloseBtn = document.querySelector('.popup__close_type_full'); // кнопка закрыть попап-картинки

// Array of cards
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

// Init all card in page
initialCards.forEach(function (item) { // для каждой карточки из массива выполнить безымянную функцию с аргументом айтем
  addCard(item.name, item.link);  // используя функцию добавления в карточки на страницу данные из массива с ключами нейм и линк
});

//Events listeners
profileOpenBtn.addEventListener('click', openProfilePopup); //добавляем слушателя события кнопке открытия попапа
profileCloseBtn.addEventListener('click', function () { closePopup(profilePopup) }); //добавляем слушателя события кнопке закрытия попапа
profilePopupForm.addEventListener('submit', submitProfilePopupForm); //добавляем слушателя события кнопке формы сохранения данных 
btnAddCard.addEventListener('click', function () { openPopup(cardPopup) }); // добавляем слушателя события по клику запуская функцию
cardPopupCloseBtn.addEventListener('click', function () { closePopup(cardPopup) }); // добавляем слушателя события для закрытия попапа по клику
cardPopupForm.addEventListener('submit', submitCardPopupForm); // назначаем слушателя события по нажатию кнопки создать
fullscreenPopupCloseBtn.addEventListener('click', function () { closePopup(fullscreenPopup) }); // добавляем слушателя на кнопку закрытия попапа для выполнения функции по клику

/**
 * Function prepend new card in card list.
 * @param {string} name Place name.
 * @param {url} url Image url.
 */
function addCard(name, url) { // функция добавления карточки на страниуц с аргументами нейм и ссылка
  const card = cardTemplate.content.cloneNode(true); // копируем содержимое темплейта в карточку (создаём шаблон)
  card.querySelector('.card__block-title').textContent = name; // в карточке указываем поле для вставки текста
  card.querySelector('.card__picture').setAttribute("src", url); // в карточке добавляем ссылку в атрибут срс
  card.querySelector('.card__picture').setAttribute("alt", name); // в карточку добавляем описание в атрибут алт
  card.querySelector('.card__picture').addEventListener('click', openFullScreen); // назначить слушателя события по клику для открытия попапа
  card.querySelector('.card__trash-button').addEventListener('click', removeCard); // назначить слушателя осбытия по клику для кнопки удалить
  card.querySelector('.card__block-button').addEventListener('click', clickLike); // назначить слушателя события по клику для кнопки лайк
  cards.prepend(card) // в карточки вставляем карточку
}

/**
 * Add class "popup_opened" for Node
 * @param {Node} nodeElement
 */
function openPopup(nodeElement) { // функция открытия попапа
  nodeElement.classList.add('popup_opened'); // добавляем класс открытия попапа
}

/**
 * Remove class "popup_opened" for Node
 * @param {Node} nodeElement
 */
function closePopup(nodeElement) { // функция закрытия попапа
  nodeElement.classList.remove('popup_opened'); // удаляем класс открытия попапа
}

/**
 * Open Profile popup function
 */
function openProfilePopup() { // функция открытия попапа профиля
  openPopup(profilePopup); // выполнить функцию открытия попапа 
  profilePupupNameInput.value = profileName.textContent; // в полле ввода при открытии назначается тест из профиля на странице
  profilePopupDescriptionInput.value = profileDescription.textContent; // в полле ввода при открытии назначается подпись из профиля на странице
}

/**
 * Submit event for profile pupup form. Chahge profile info in main page. Add info from input popup.
 * @param {event} evt
 */
function submitProfilePopupForm(evt) { //функция нажатия кнопки сохранить
  evt.preventDefault(); //отменяет стандартное действие на кнопку
  profileName.textContent = profilePupupNameInput.value; // на страницу присваивается значение из инпута
  profileDescription.textContent = profilePopupDescriptionInput.value; // на страницу присваивается значение из инпута
  closePopup(profilePopup);//вызов функции закрытия попапа
}

/**
 * Add or remove like
 * @param {event} evt
 */
function clickLike(evt) { // функция с параметром события
  evt.target.classList.toggle('card__block-button_active');// на что нажали - меняем класс
}

/**
 * Remove card from cards
 * @param {event} evt
 */
function removeCard(evt) { //функция удаления карточки
  evt.target.closest('.card').remove();// событие нажатия удалить родительский элемент
}

/**
 * Open popup for fullscreen picture
 * @param {event} evt
 */
function openFullScreen(evt) { // функция по событию
  fullscreenPopup.querySelector('.popup__fullscr-picture').setAttribute('src', evt.target.getAttribute('src')); // выбираем картинку в форме и добавляем атрибут в срс из выбранной по клику картинки из атрибута срс
  fullscreenPopup.querySelector('.popup__fullscr-title').textContent = evt.target.closest('.card').querySelector('.card__block-title').textContent; // выбираем поле текста и контенту присваиваем найденный по клику у ближайшего родительского элемента через селектор текст
  openPopup(fullscreenPopup); // добавляем класс для всплытия попапа
}

/**
 * Submit popup cart form. Add new card in cards
 * @param {event} evt
 */
function submitCardPopupForm(evt) { // функция добавления карточки и контента в неё
  evt.preventDefault(); // отмена стандартного действия при нажатии кнопки
  addCard(cardPopup.querySelector('.popup__text_type_place-name').value, cardPopup.querySelector('.popup__text_type_url').value); // функция добавления карточки с указанием откуда брать аргументы
  closePopup(cardPopup); //закрываем попап
  cardPopup.querySelector('.popup__text_type_place-name').value = ''; // очищаем поле попапа после ввода
  cardPopup.querySelector('.popup__text_type_url').value = ''; // очищаем поле попапа после ввода
}