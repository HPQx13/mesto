const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.popup-open');
const closePopup = popup.querySelector('.popup__close');
let nameOutput = document.querySelector('.profile__name');
let jobOutput = document.querySelector('.profile__description');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_job');

function startPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOutput.textContent;
}

function endPopup() {
    popup.classList.remove('popup_opened');
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOutput.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
    endPopup()
}

openPopup.addEventListener('click', startPopup);
closePopup.addEventListener('click', endPopup);
formElement.addEventListener('submit', formSubmitHandler);
