const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.popup-open');
const closePopup = popup.querySelector('.popup__close');
let nameOutput = document.querySelector('.profile__name');
let jobOutput = document.querySelector('.profile__description'); 


function togglePopup() {
    popup.classList.toggle('popup__opened');
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOutput.textContent;
}

popup.addEventListener('click', function(event) {
    if (event.target === event.currentTarget) {
        togglePopup();
    }
});

openPopup.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);

let formElement = document.querySelector('.popup__form')
let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_job');

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
    togglePopup()
}

formElement.addEventListener('submit', formSubmitHandler);
