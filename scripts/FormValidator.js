export default class FormValidator {
  /**
   * 
   * @param {fieldSetClass, inputClass, submitButtonClass, inactiveButtonClass, inputErrorClass, errorClass,errorBorderClass} classSelector Object with class for validation form.
   * @param {NodeElement} formElement NodeElement of form validaiton.
   */

  constructor(classSelector, formElement) {
    this.classSelector = classSelector;
    this.formElement = formElement;
    this.formFieldSet = this.formElement.querySelectorAll(this.classSelector.fieldSetClass); //find all fildSet in form
  }

  enableValidation() {
    this.formElement.addEventListener('submit', evt => evt.preventDefault());
    this.formFieldSet.forEach((fieldset) => {
      this._setEventListeners(fieldset);
    });
  }

  _setEventListeners(fieldset) {
    const inputList = Array.from(fieldset.querySelectorAll(this.classSelector.inputClass)); // создаём массив всех полей внутри формы
    const buttonElement = fieldset.querySelector(this.classSelector.submitButtonClass);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(fieldset, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }


  _checkInputValidity(fieldset, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(fieldset, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(fieldset, inputElement);
    }
  }

  _showInputError(fieldset, inputElement, errorMessage) {
    const errorElement = fieldset.querySelector(`.${inputElement.id}-error`); // находим элемент ошибки 
    inputElement.classList.add(this.classSelector.inputErrorClass);
    inputElement.classList.add(this.classSelector.errorBorder);
    errorElement.classList.add(this.classSelector.errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(fieldset, inputElement) {
    const errorElement = fieldset.querySelector(`.${inputElement.id}-error`); // находим элемент ошибки
    inputElement.classList.remove(this.classSelector.inputErrorClass);
    inputElement.classList.remove(this.classSelector.errorBorder);
    errorElement.classList.remove(this.classSelector.errorClass);
    errorElement.textContent = '';
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._btnInactive(buttonElement);
    } else {
      buttonElement.classList.remove(this.classSelector.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  _btnInactive(buttonElement) {
    buttonElement.classList.add(this.classSelector.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputSelect) => {
      return !inputSelect.validity.valid;
    });
  }
}