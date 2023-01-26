import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import initialCards from "./data.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

/* ПЕРЕМЕННЫЕ  */

const popupEditProfileContainer = document.querySelector(".popup_edit-profile");
const popupAddCardForm = document.forms["card-form"];
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddNewCard = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__status");
const nameInput = document.querySelector('[name="popup-name"]');
const jobInput = document.querySelector('[name="popup-job"]');
const listElement = document.querySelector(".elements__list");
const formInputTitle = document.querySelector('[name="place-name"]');
const formInputImage = document.querySelector('[name="place-image"]');


const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_invalid",
  activeButtonClass: "popup__button_valid",
  inputErrorClass: "popup__input_type_error"
};

// Включение валидации

const profileFormValidator = new FormValidator(config, popupEditProfileContainer);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, popupAddCardForm);
cardFormValidator.enableValidation();

//Функции

function handleCardClick(title, image) {
  popupWithImage.open(title, image);
}

/* Слушатели */

buttonEditProfile.addEventListener("click", function () {
  popupFormProfile.open();
  userInfo.getUserInfo(nameInput,jobInput);
  profileFormValidator.resetForm();
});

buttonAddNewCard.addEventListener("click", function () {
  popupFormAddCard.open();
  cardFormValidator.resetForm();
});

//Функция загрузки карточки в нужный селектор
function createCard(title, image) {
  const cardElement = new Card(title, image, "#element-template", handleCardClick);
  return cardElement.generateCard();
}

function renderCard({ title, image }) {
  const card = createCard(title, image);
  listElement.prepend(card);
}

//Создаем объект класса PopupWhithImage и навешиваем слушатели событий
const popupWithImage = new PopupWithImage("#popup-image");
popupWithImage.setEventListeners();

const cardList = new Section({initialCards, renderer: renderCard}, "#element-template");
cardList.renderCards(initialCards);

const handleSubmitAddCard = (e) => {
  const imageValue = formInputImage.value;
  const titleValue = formInputTitle.value;
  renderCard({ title: titleValue, image: imageValue });
  popupFormAddCard.close();
};

//создаем объект класса PopupWhithForm для попапа (создание новой карточки)
const popupFormAddCard = new PopupWithForm(".popup_add-new-card", handleSubmitAddCard);
popupFormAddCard.setEventListeners();

const handleSubmitProfile = () => {
  userInfo.setUserInfo(nameInput,jobInput);
  popupFormProfile.close();
};

//Создаем объект UserInfo
const userInfo = new UserInfo({selectorName: profileName, selectorDescription: profileJob});

//Создаем объект PopupWhithForm для попапа (редактирование профиля)
const popupFormProfile = new PopupWithForm(".popup_edit-profile", handleSubmitProfile);
popupFormProfile.setEventListeners();