//валидация форм 

const showInputError = (fieldset, inputElement, {inputErrorClass, errorClass, errorBorder, ...rest}, errorMessage) => {
  const errorElement = fieldset.querySelector(`.${inputElement.id}-error`); // находим элемент ошибки 
  inputElement.classList.add(inputErrorClass);
  inputElement.classList.add(errorBorder);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (fieldset, inputElement, {inputErrorClass, errorClass, errorBorder, ...rest}) => {
  const errorElement = fieldset.querySelector(`.${inputElement.id}-error`); // находим элемент ошибки
  inputElement.classList.remove(inputErrorClass);
  inputElement.classList.remove(errorBorder);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (fieldset, inputElement, rest) => {
  if (!inputElement.validity.valid) {
      showInputError(fieldset, inputElement, rest, inputElement.validationMessage);
  } else {
      hideInputError(fieldset, inputElement, rest);
  }
};

const setEventListeners = (fieldset, {inputSelector, submitButtonSelector,  inactiveButtonClass, ...rest}) => {
  const inputList = Array.from(fieldset.querySelectorAll(inputSelector)); // создаём массив всех полей внутри формы
  const buttonElement = fieldset.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
          checkInputValidity(fieldset, inputElement, rest);
          toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
  });
};

const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector)); //создаём массив всех форм
  formList.forEach((formSelector) => {
      formSelector.addEventListener('submit', function(evt) {
          evt.preventDefault();
      });
  });
  const fieldsetList = Array.from(document.querySelectorAll('.popup__form-set')); //создаём массив всех филдсетов
  fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset, rest);
  });
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelect) => {
      return !inputSelect.validity.valid;
  });
}

function toggleButtonState (inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
  } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
  }
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  errorBorder: 'popup__border-error'
});