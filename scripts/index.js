const popup = document.querySelector('.popup_type_profile'); // попап-профиль
const openPopup = document.querySelector('.profile__button-edit'); // Открыть попап-профиль
const closePopup = document.querySelector('.popup__close_type_profile'); // Закрыть попап-профиль
let trashButtons = document.querySelectorAll('.card__trash-button'); // Кнопки удалить карточку

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
initialCards.forEach(function (item) {
  const card = cardTemplate.content.cloneNode(true);
  card.querySelector('.card__block-title').textContent = item.name;
  card.querySelector('.card__picture').setAttribute("src", item.link);
  cards.append(card)
  trashButtons = document.querySelectorAll('.card__trash-button');
});


/////////////////////////////////////
// Функция открытия попапа-профиля и функция закрытия, функция сохранения данных из попапа-профиля в профиль

function startPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
}

function endPopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;
  endPopup()
}

openPopup.addEventListener('click', startPopup);
closePopup.addEventListener('click', endPopup);
formElement.addEventListener('submit', formSubmitHandler);

/////////////////////////////////////
// Кнопка лайк

let likes = document.querySelectorAll('.card__block-button');

function likeActive(evt) {
  evt.target.classList.toggle('card__block-button_active');
}

likes.forEach((like) => { // что сделать с каждой кнопкой 
  like.addEventListener('click', likeActive);
})

/////////////////////////////////////
// Кнопка удалить карточку

trashButtons.forEach((trashButton) => { // что сделать с каждой кнопкой 
  trashButton.addEventListener('click', removeCard)
})

function removeCard(evt) {
  evt.target.parentElement.remove();
}

/////////////////////////////////////
// Открытие попапа добавления карточки

function startPopupCard() {
  popupCard.classList.add('popup_opened');
}

openPopupCard.addEventListener('click', startPopupCard);

function endPopupCard() {
  popupCard.classList.remove('popup_opened');
}

closePopupCard.addEventListener('click', endPopupCard);

/////////////////////////////////////
// Добавить открытие фул-скрин попапа с картинкой
//
let cardPictures = document.querySelectorAll('.card__picture'); // все картинки в карточках
const closeFullScreen = document.querySelector('.popup__close_type_full'); // кнопка закрыть попап-картинки

cardPictures.forEach((cardPicture) => {
  cardPicture.addEventListener('click', openFullScreen);
})

const popupFullScreen = document.querySelector('.popup_type_full') // фул-скрин попап-картинки

function openFullScreen(evt) {
  document.querySelector('.popup__picture_type_full').setAttribute('src', evt.target.getAttribute('src'));
  document.querySelector('.popup__title_type_full').textContent = evt.target.parentNode.querySelector('.card__block-title').textContent;
  popupFullScreen.classList.add('popup_opened');
}

function endFullScreen() {
  popupFullScreen.classList.remove('popup_opened');
}

closeFullScreen.addEventListener('click', endFullScreen);

/////////////////////////////////////
// Добавить карточку
//
function cardFormSubmitHandler(evt) {
  const card = cardTemplate.content.cloneNode(true);
  evt.preventDefault();
  card.querySelector('.card__block-title').textContent = popupCard.querySelector('.popup__text_type_place-name').value;
  card.querySelector('.card__picture').setAttribute("src", popupCard.querySelector('.popup__text_type_url').value);
  card.querySelector('.card__picture').addEventListener('click', openFullScreen);
  card.querySelector('.card__trash-button').addEventListener('click', removeCard);
  card.querySelector('.card__block-button').addEventListener('click', likeActive);
  cards.append(card)
  endPopupCard()
  popupCard.querySelector('.popup__text_type_place-name').value = '';
  popupCard.querySelector('.popup__text_type_url').value = '';
}

formElementCard.addEventListener('submit', cardFormSubmitHandler);