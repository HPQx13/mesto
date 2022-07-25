import Card from './Card.js';
import FormValidator from './FormValidator.js'

const popups = document.querySelectorAll('.popup'); // Array of popups
const cardClassSelector = '.card-template';


const profilePopup = document.querySelector('.popup_type_profile'); // попап-профиль
const profileOpenBtn = document.querySelector('.profile__button-edit'); // Открыть попап-профиль
const closeButtons = document.querySelectorAll('.popup__close'); //закрытие попап-профиль

const profileName = document.querySelector('.profile__name'); // имя профиля
const profileDescription = document.querySelector('.profile__description'); // подпись профиля

const profilePopupForm = document.querySelector('.popup__form_profile'); // форма попап-профиля
const profilePupupNameInput = document.querySelector('.popup__input_type_name'); // поле ввода попап-профиля имя
const profilePopupDescriptionInput = document.querySelector('.popup__input_type_job'); // поле вводу попап-профиля подписи

const btnAddCard = document.querySelector('.profile__button-add'); // кнопка добавления картчоки
const cardPopup = document.querySelector('.popup_type_card'); // попап-карточки
const cardPopupPlaceInput = document.querySelector('.popup__input_type_place'); // имя профиля
const cardPopupUrlInput = document.querySelector('.popup__input_type_img'); // подпись профиля
const cardPopupForm = document.querySelector('.popup__form_card'); // форма попап-карточки
const cardSubmitBtn = cardPopup.querySelector('.popup__button');

const cardsContainer = document.querySelector('.cards'); // список карточек

const fullscreenPopup = document.querySelector('.popup_type_full') // фул-скрин попап-картинки
const fullscreenPic = fullscreenPopup.querySelector('.popup__fullscr-picture'); // выбираем картинку в форме
const fullscreenTitle = fullscreenPopup.querySelector('.popup__fullscr-title'); // выбираем поле текста

const classSelector = {
  inputClass: '.popup__input',
  submitButtonClass: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  errorBorderClass: 'popup__border-error'
};

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
  const cardEl = createCard(cardClassSelector, item.name, item.link, openFullScreen);
  cardsContainer.append(cardEl.getCard());
});

/**
 * func open full screen image
 * @param {string} name is name of place
 * @param {url} link is link for image
 */
function openFullScreen(name, link) {
  fullscreenPic.setAttribute('src', link);
  fullscreenPic.setAttribute('alt', name);
  fullscreenTitle.textContent = name;
  openPopup(fullscreenPopup);
}


function createCard(cardClassSelector, name, link, openFullScreen) {
  return new Card(cardClassSelector, name, link, openFullScreen);
}

/**
 * Close form whit click "ECS"
 * @param {evt} evt 
 */
function closeEsc(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup)
  }
}

/**
 * Add class "popup_opened" for Node
 * @param {Node} nodeElement
 */
function openPopup(nodeElement) { // функция открытия попапа
  nodeElement.classList.add('popup_opened'); // добавляем класс открытия попапа
  document.addEventListener('keydown', closeEsc);
}

/**
 * Remove class "popup_opened" for Node
 * @param {Node} nodeElement
 */
function closePopup(nodeElement) { // функция закрытия попапа
  nodeElement.classList.remove('popup_opened'); // удаляем класс открытия попапа
  document.removeEventListener('keydown', closeEsc);
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
  evt.target.reset();
  profileValidation.enableValidation();
}

/**
 * Submit popup cart form. Add new card in cards
 * @param {event} evt
 */
function submitCardPopupForm(evt) { // функция добавления карточки и контента в неё
  evt.preventDefault(); // отмена стандартного действия при нажатии кнопки
  const cardEl = createCard(cardClassSelector, cardPopupPlaceInput.value, cardPopupUrlInput.value, openFullScreen);
  cardsContainer.prepend(cardEl.getCard());
  closePopup(cardPopup); //закрываем попап
  evt.target.reset() //очищаем поля формы после ввода
  newCardValidation.enableValidation();
}

//Events listeners
profileOpenBtn.addEventListener('click', openProfilePopup); //добавляем слушателя события кнопке открытия попапа
closeButtons.forEach((button) => {
  const popup = button.closest('.popup'); // находим 1 раз ближайший к крестику попап 
  button.addEventListener('click', () => closePopup(popup)); // устанавливаем обработчик закрытия на крестик
});
profilePopupForm.addEventListener('submit', submitProfilePopupForm); //добавляем слушателя события кнопке формы сохранения данных 
btnAddCard.addEventListener('click', function () { openPopup(cardPopup) }); // добавляем слушателя события по клику запуская функцию
cardPopupForm.addEventListener('submit', submitCardPopupForm); // назначаем слушателя события по нажатию кнопки создать
//добавляем слушателя для закрытия по клику на оверлей
popups.forEach(function (popup) {
  popup.addEventListener('mousedown', function (event) { // закрытие по оверлею
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  });
})

const profileValidation = new FormValidator(classSelector, profilePopup);
const newCardValidation = new FormValidator(classSelector, cardPopup);
profileValidation.enableValidation();
newCardValidation.enableValidation();