import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import initialCards from "./data.js";

/* ПЕРЕМЕННЫЕ  */

const popupEditProfileContainer = document.querySelector(".popup_edit-profile");
const formEditProfile = document.forms["profile-form"];
const popupAddCard = document.querySelector(".popup_add-new-card");
const popupAddCardForm = document.forms["card-form"];
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddNewCard = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__status");
const nameInput = document.querySelector('[name="popup-name"]');
const jobInput = document.querySelector('[name="popup-job"]');
const listElement = document.querySelector(".elements__list");
const formAddCard = document.querySelector(".popup__form_new-item");
const formInputTitle = document.querySelector('[name="place-name"]');
const formInputImage = document.querySelector('[name="place-image"]');
const popups = document.querySelectorAll(".popup");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_invalid",
  activeButtonClass: "popup__button_valid",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Включение валидации
const profileFormValidator = new FormValidator(config,popupEditProfileContainer);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, popupAddCardForm);
cardFormValidator.enableValidation();

//Функции
export const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
};

const addValueProfileForm = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

const resetCardForm = function () {
  popupAddCardForm.reset();
};

export const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
};

//Закрываем все попапы при клике на фон

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  });
});

//Функция закрытия попапа при клике на ESC
function closePopupEsc(key) {
  if (key.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

/* Слушатели */

buttonEditProfile.addEventListener("click", function () {
  openPopup(popupEditProfileContainer);
  addValueProfileForm();
  profileFormValidator.resetForm();
});

buttonAddNewCard.addEventListener("click", function () {
  openPopup(popupAddCard);
  resetCardForm();
  cardFormValidator.resetForm();
});

formEditProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfileContainer);
});

/*  Создание нового объекта */
const submitAddCardForm = (e) => {
  e.preventDefault();
  const imageValue = formInputImage.value;
  const titleValue = formInputTitle.value;
  e.target.reset();
  closePopup(popupAddCard);
  renderCard(titleValue, imageValue);
};

formAddCard.addEventListener("submit", submitAddCardForm);

//Создаем карты при загрузке страницы
initialCards.forEach(function (item) {
  renderCard(item.title, item.image);
});

//Функция загрузки карточки в нужный селектор

function createCard(title, image) {
  const cardElement = new Card(title, image, "#element-template");
  return cardElement.generateCard();
}

function renderCard(title, image) {
  const card = createCard(title, image);
  listElement.prepend(card);
}
