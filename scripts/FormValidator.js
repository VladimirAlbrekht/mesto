export class FormValidator {
  constructor(config, formSelector) {
    this._config = config;
    this._formSelector = formSelector;
    this._inputSelector = config.inputSelector;
    this._form = config.formSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._button = this._formSelector.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
  }

  _hideInputError(input) {
    const error = this._formSelector.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = "";
  }

  _showInputError(input) {
    const error = this._formSelector.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.classList.add(this._errorClass);
    error.textContent = input.validationMessage;
  }

  _checkInputValidity(input) {
    if (input.validity.valid || input.value == "") {
      this._hideInputError(input, this._config);
    } else {
      this._showInputError(input, this._config);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((item) => {
      if (item.validity.valid) {
        return false;
      } else {
        return true;
      }
    });
  }

  _toggleButton() {
    if (this._hasInvalidInput(this._inputList)) {
      this._button.disabled = true;
      this._button.classList.add(this._inactiveButtonClass);
    } else {
      this._button.disabled = false;
      this._button.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._toggleButton(this._inputList, this._button);
    this._inputList.forEach((input) => {
      this._checkInputValidity(input);
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButton(this._inputList, this._button);
      });
    });
  }

  _resetValidation() {
    this._toggleButton();
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement)
    });

  }

  enableValidation() {
      this._setEventListeners();
  }
}