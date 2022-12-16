import initialCards from "./data.js";

/* ПЕРЕМЕННЫЕ  */

const popupEditProfileContainer = document.querySelector(".popup_edit-profile");
const formEditProfile = document.querySelector(".popup__form_edit-profile");
const popupAddCard = document.querySelector(".popup_add-new-card");
const popupAddCardForm = document.querySelector(".popup__form_new-item");
const popupOpenImage = document.querySelector(".popup_open-image");
const popupImageTitle = document.querySelector(".popup__title_picture");
const popupImageLink = document.querySelector(".popup__image_picture");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddNewCard = document.querySelector(".profile__add-button");
const buttonCloseEditForm = document.querySelector(".popup__close_edit-form");
const buttonCloseAddForm = document.querySelector(".popup__close_add-form");
const buttonCloseImageForm = document.querySelector(".popup__close_image-form");
const popupSaveButtonNewCard = document.querySelector("#add-card-button");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__status");
const nameInput = document.querySelector('[name="popup-name"]');
const jobInput = document.querySelector('[name="popup-job"]');
const listElement = document.querySelector(".elements__list");
const elementTemplate = document
  .querySelector("#element-template")
  .content.querySelector(".element");
const formAddCard = document.querySelector(".popup__form_new-item");
const formInputTitle = document.querySelector('[name="place-name"]');
const formInputImage = document.querySelector('[name="place-image"]');
const popups = document.querySelectorAll(".popup");
const popupSubmitNewPlaceButton = document.querySelector(
  ".popup__save-button_type_add"
);

/* ФУНКЦИИ */

const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
};

const addValueProfileForm = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

const removeValueformAddCard = function () {
  popupAddCardForm.reset();
};

const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  removeValueformAddCard();
};

//ЗАКРЫВАЕМ ВСЕ ПОПАПЫ ПРИ КЛИКЕ НА ФОН

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(evt.target);
    }
  });
});

function resetError(popup) {
  const inputArray = Array.from(popup.querySelectorAll(".popup__input"));
  inputArray.forEach((inputElement) => {
    const errorElement = popup.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove("popup__input_type_error");
    errorElement.textContent = "";
  });
}

//Функция диактивации кнопки
function disactivateSubmitButton(button) {
  button.classList.add("popup__button_disabled");
  button.classList.add("popup__button_invalid");
  button.disabled = true;
}

//Функция закрытия попапа при клике на ESC
function closePopupEsc(key) {
  if (key.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

/* Слушатели */
buttonEditProfile.addEventListener("click", function () {
  resetError(popupEditProfileContainer);
  openPopup(popupEditProfileContainer);
  addValueProfileForm()
});

buttonCloseEditForm.addEventListener("click", function () {
  closePopup(popupEditProfileContainer);
});

buttonCloseImageForm.addEventListener("click", () =>
  closePopup(popupOpenImage)
);

buttonAddNewCard.addEventListener("click", function () {
  resetError(popupAddCard);
  disactivateSubmitButton(popupSubmitNewPlaceButton);
  openPopup(popupAddCard);
});

buttonCloseAddForm.addEventListener("click", function () {
  closePopup(popupAddCard);
  removeValueformAddCard(popupSaveButtonNewCard);
});

formEditProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopupEsc;
  closePopup(popupEditProfileContainer);
});

buttonCloseAddForm.addEventListener("click", () => closePopup(popupAddCard));

/* Функция создания новой карты*/
function createElement(card) {
  const newElement = elementTemplate.cloneNode(true);
  const newElementTitle = newElement.querySelector(".element__title");
  const newElementImage = newElement.querySelector(".element__image");
  newElementImage.src = card.image;
  newElementImage.alt = card.title;
  newElementTitle.textContent = card.title;
  const newElementLikeButton = newElement.querySelector(".element__like");
  const newElementDeleteButton = newElement.querySelector(".element__trash");
  newElementDeleteButton.addEventListener("click", handleDeleteButtonClick);
  newElementLikeButton.addEventListener("click", handleLikeButtonClick);

  /*  Открытие попапа с картинкой */
  newElementImage.addEventListener("click", function () {
    openPopup(popupOpenImage);
    popupImageLink.src = card.image;
    popupImageLink.alt = card.title;
    popupImageTitle.textContent = card.title;
  });
  return newElement;
}

/* Функция добавления и удаления лайка */
const handleLikeButtonClick = (e) => {
  e.target.classList.toggle("element__like_active");
};
/* Функция удаления поста */
const handleDeleteButtonClick = (e) => {
  e.target.closest(".element").remove();
};

const renderNewElement = (card, wrapElement) => {
  const element = createElement(card);
  wrapElement.prepend(element);
};

initialCards.forEach(function (card) {
  renderNewElement(card, listElement);
});
/*  Создание нового объекта */
const submitAddCardForm = (e) => {
  e.preventDefault();
  const newElement = {
    title: formInputTitle.value,
    image: formInputImage.value,
  };
  e.target.reset();
  closePopup(popupAddCard);
  renderNewElement(newElement, listElement);
};

formAddCard.addEventListener("submit", submitAddCardForm);
