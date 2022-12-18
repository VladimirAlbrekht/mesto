//Валидация форм
const checkInputValidity = function (input) {
  const error = document.querySelector(`#${input.id}-error`);
  if (input.validity.valid) {
    hideInputError();
  } else {
    showInputError(error, input);
  }
};

//функция добавления ошибок
function showInputError(error, input) {
  error.textContent = input.validationMessage;
  error.classList.add(`#${input.id}-error`);
  input.classList.add("popup__input_type_error");
}

//функция обнуления ошибок
export function hideInputError() {
  const inputArray = Array.from(document.querySelectorAll(".popup__input"));
  inputArray.forEach((input) => {
    const error = document.querySelector(`#${input.id}-error`);
    input.classList.remove("popup__input_type_error");
    error.textContent = "";
  });
}

//Функция диактивации кнопки
export const disactivateSubmitButton = function (button) {
  button.classList.add("popup__button_disabled");
  button.classList.add("popup__button_invalid");
  button.disabled = true;
};

export const activateSubmitButton = function (button) {
  button.classList.remove("popup__button_disabled");
  button.classList.remove("popup__button_invalid");
  button.disabled = false;
};

const toggleButton = (inputs, button, config) => {
  const isFormValid = inputs.every((input) => input.validity.valid);
  if (isFormValid) {
    activateSubmitButton(button);
  } else {
    disactivateSubmitButton(button);
  }
};

export const enableFormValidation = function (config) {
  const { formSelector, inputSelector, submitButtonSelector, ...restConfig } =
    config;
  const forms = [...document.querySelectorAll(formSelector)];

  forms.forEach((form) => {
    const inputs = [...form.querySelectorAll(inputSelector)];
    const button = form.querySelector(submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(input, config);
        toggleButton(inputs, button, restConfig);
      });
    });
  });
};

export const enableValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_invalid",
  activeButtonClass: "popup__button_valid",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableFormValidation(enableValidation);
