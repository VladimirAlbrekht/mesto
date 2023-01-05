export class FormValidator {
  constructor(config, formSelector) {
    this._config = config;
    this._formSelector = formSelector;
  }

  _hideInputError(input) {
    const { inputErrorClass, errorClass } = this._config;
    const error = this._formSelector.querySelector(`#${input.id}-error`);

    input.classList.remove(inputErrorClass);
    error.classList.remove(errorClass);

    error.textContent = "";
  }

  _showInputError(input) {
    const { inputErrorClass, errorClass } = this._config;
    const error = this._formSelector.querySelector(`#${input.id}-error`);
    input.classList.add(inputErrorClass);
    error.classList.add(errorClass);
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
    const { inputSelector, submitButtonSelector } = this._config;
    const button = this._formSelector.querySelector(submitButtonSelector);
    const inputList = Array.from(
      this._formSelector.querySelectorAll(inputSelector)
    );
    if (this._hasInvalidInput(inputList)) {
      button.disabled = true;
      button.classList.add("popup__button_invalid");
    } else {
      button.disabled = false;
      button.classList.remove("popup__button_invalid");
    }
  }

  _setEventListeners() {
    const { inputSelector, submitButtonSelector, ...rest } = this._config;
    const inputList = Array.from(
      this._formSelector.querySelectorAll(inputSelector)
    );
    const button = this._formSelector.querySelector(submitButtonSelector);
    this._toggleButton(inputList, button);

    inputList.forEach((input) => {
      this._checkInputValidity(input, rest);
      input.addEventListener("input", () => {
        this._checkInputValidity(input, rest);
        this._toggleButton(inputList, button);
      });
    });
  }

  resetForm() {
    const { inputSelector, submitButtonSelector, ...rest } = this._config;
    this._formSelector.reset();
    const inputList = Array.from(
      this._formName.querySelectorAll(inputSelector)
    );
    inputList.forEach((input) => {
      this._hideInputError(input, rest);
      const inputList = Array.from(
        this._formSelector.querySelectorAll(inputSelector)
      );
      const button = this._formSelector.querySelector(submitButtonSelector);
      this._toggleButton(inputList, button);
    });
  }

  enableValidation() {
    const { formSelector, ...rest } = this._config;
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
      this._setEventListeners(formElement, rest);
    });
  }
}
