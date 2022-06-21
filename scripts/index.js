const popups = document.querySelectorAll('.popup'); // Array of popups

const profilePopup = document.querySelector('.popup_type_profile'); // попап-профиль
const profileOpenBtn = document.querySelector('.profile__button-edit'); // Открыть попап-профиль
const closeButtons = document.querySelectorAll('.popup__close'); //закрытие попап-профиль

const profileName = document.querySelector('.profile__name'); // имя профиля
const profileDescription = document.querySelector('.profile__description'); // подпись профиля

const profilePopupForm = document.querySelector('.popup__form_profile'); // форма попап-профиля
const profilePupupNameInput = document.querySelector('.popup__input_type_name'); // поле ввода попап-профиля имя
const profilePopupDescriptionInput = document.querySelector('.popup__input_type_job'); // поле вводу попап-профиля подписи
const profileSubmitBtn = profilePopup.querySelector('.popup__button');

const btnAddCard = document.querySelector('.profile__button-add'); // кнопка добавления картчоки
const cardPopup = document.querySelector('.popup_type_card'); // попап-карточки
const cardPopupPlaceInput = document.querySelector('.popup__input_type_place'); // имя профиля
const cardPopupUrlInput = document.querySelector('.popup__input_type_img'); // подпись профиля
const cardPopupForm = document.querySelector('.popup__form_card'); // форма попап-карточки
const cardSubmitBtn = cardPopup.querySelector('.popup__button');

const cards = document.querySelector('.cards'); // список карточек
const cardTemplate = document.querySelector('.card-template'); // подгружаем форму карточки

const fullscreenPopup = document.querySelector('.popup_type_full') // фул-скрин попап-картинки
const fullscreenPic = fullscreenPopup.querySelector('.popup__fullscr-picture'); // выбираем картинку в форме
const fullscreenTitle = fullscreenPopup.querySelector('.popup__fullscr-title'); // выбираем поле текста
const deafaultCards = [];

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
  deafaultCards.push(createCard(item.name, item.link))
});

cards.append(...deafaultCards);

/**
 * Create new card
 * @param {string} name place name
 * @param {string} url for img
 */
function createCard(name, url) {
  // тут создаете карточку и возвращаете ее
  const card = cardTemplate.content.cloneNode(true);
  const cardPic = card.querySelector('.card__picture');
  card.querySelector('.card__block-title').textContent = name; // в карточке указываем поле для вставки текста
  cardPic.setAttribute("src", url); // в карточке добавляем ссылку в атрибут срс
  cardPic.setAttribute("alt", name); // в карточку добавляем описание в атрибут алт
  cardPic.addEventListener('click', openFullScreen); // назначить слушателя события по клику для открытия попапа
  card.querySelector('.card__trash-button').addEventListener('click', removeCard); // назначить слушателя осбытия по клику для кнопки удалить
  card.querySelector('.card__block-button').addEventListener('click', clickLike); // назначить слушателя события по клику для кнопки лайк
  return card
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
 * Add new card in cards
 * @param {string} name place name
 * @param {string} url for img
 */
function addCard(name, url) {
  const card = createCard(name, url)
  cards.prepend(card) // в карточки вставляем карточку
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
  nodeElement.querySelector('form').reset();
  btnInactive(nodeElement.querySelector('.popup__button'));
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
  btnInactive(profileSubmitBtn);
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
  const namePic = evt.target.closest('.card').querySelector('.card__block-title').textContent;
  fullscreenPic.setAttribute('src', evt.target.getAttribute('src')); // выбираем картинку в форме и добавляем атрибут в срс из выбранной по клику картинки из атрибута срс
  fullscreenPic.setAttribute('alt', namePic);
  fullscreenTitle.textContent = namePic; // выбираем поле текста и контенту присваиваем найденный по клику у ближайшего родительского элемента через селектор текст
  openPopup(fullscreenPopup); // добавляем класс для всплытия попапа
}

/**
 * Submit popup cart form. Add new card in cards
 * @param {event} evt
 */
function submitCardPopupForm(evt) { // функция добавления карточки и контента в неё
  evt.preventDefault(); // отмена стандартного действия при нажатии кнопки
  addCard(cardPopupPlaceInput.value, cardPopupUrlInput.value); // функция добавления карточки с указанием откуда брать аргументы
  closePopup(cardPopup); //закрываем попап
  btnInactive(cardSubmitBtn);
  evt.target.reset() //очищаем поля формы после ввода
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
  popup.addEventListener('click', function (event) { // закрытие по оверлею
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  });
})