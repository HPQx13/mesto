export default class FormValidator {
  /**
   * 
   * @param {, inputClass, submitButtonClass, inactiveButtonClass, inputErrorClass, errorClass,errorBorderClass} classSelector Object with class for validation form.
   * @param {NodeElement} formElement NodeElement of form validaiton.
   */

  constructor(classSelector, formElement) {
    this.classSelector = classSelector;
    this.formElement = formElement;
    this.inputList = Array.from(this.formElement.querySelectorAll(this.classSelector.inputClass));
    this.buttonElement = this.formElement.querySelector(this.classSelector.submitButtonClass);
  }

  enableValidation() {
    this._toggleButtonState();
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._setBtnInactive();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement) 
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`); // находим элемент ошибки 
    inputElement.classList.add(this.classSelector.inputErrorClass);
    inputElement.classList.add(this.classSelector.errorBorder);
    errorElement.classList.add(this.classSelector.errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`); // находим элемент ошибки
    inputElement.classList.remove(this.classSelector.inputErrorClass);
    inputElement.classList.remove(this.classSelector.errorBorder);
    errorElement.classList.remove(this.classSelector.errorClass);
    errorElement.textContent = '';
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._setBtnInactive();
    } else {
      this._setBtnActive();
    }
  }

  _setBtnInactive() {
    this.buttonElement.classList.add(this.classSelector.inactiveButtonClass);
    this.buttonElement.setAttribute('disabled', 'disabled');
  }

  _setBtnActive() {
    this.buttonElement.classList.remove(this.classSelector.inactiveButtonClass);
    this.buttonElement.removeAttribute('disabled');
  }

  _hasInvalidInput() {
    return this.inputList.some((inputSelect) => {
      return !inputSelect.validity.valid;
    });
  }
}