import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  config,
  popupEditProfileContainer,
  popupAddCardForm,
  buttonEditProfile,
  buttonAddNewCard,
  nameInput,
  jobInput
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./../pages/index.css";

// Включение валидации

const profileFormValidator = new FormValidator(
  config,
  popupEditProfileContainer
);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, popupAddCardForm);
cardFormValidator.enableValidation();

//Функции
function handleCardClick(title, image) {
  popupWithImage.open(title, image);
}

//Функция загрузки карточки в нужный селектор
function createCard(title, image) {
  const cardElement = new Card(
    title,
    image,
    "#element-template",
    handleCardClick
  );
  return cardElement.generateCard();
}

function renderCard({ title, image }) {
  const card = createCard(title, image);
  cardList.addItem(card);
}

//Создаем объект класса PopupWhithImage и навешиваем слушатели событий
const popupWithImage = new PopupWithImage("#popup-image");
popupWithImage.setEventListeners();

const cardList = new Section(
  {initialCards, renderer: renderCard },
  "#element-template"
);

cardList.renderCards(initialCards);

//Создаем объект UserInfo
const userInfo = new UserInfo({
  selectorName: ".profile__name",
  selectorDescription: ".profile__status",
});

const handleSubmitAddCard = (values) => {
  const imageValue = values["place-image"];
  const titleValue = values["place-name"];
  renderCard({ title: titleValue, image: imageValue });
  popupFormAddCard.close();
};

//создаем объект класса PopupWhithForm для попапа (создание новой карточки)
const popupFormAddCard = new PopupWithForm(
  ".popup_add-new-card",
  handleSubmitAddCard
);
popupFormAddCard.setEventListeners();

const handleSubmitProfile = (values) => {
  const nameInput = values["popup-name"];
  const statusInput = values["popup-job"];
  userInfo.setUserInfo({
    name: nameInput,
    about: statusInput,
  });
  popupFormProfile.close();
};

//Создаем объект PopupWhithForm для попапа (редактирование профиля)
const popupFormProfile = new PopupWithForm(
  ".popup_edit-profile",
  handleSubmitProfile
);
popupFormProfile.setEventListeners();

/* Слушатели */

buttonEditProfile.addEventListener("click", function () {
  popupFormProfile.open();
  const userData = userInfo.getUserInfo();
  (nameInput.value = userData.name), (jobInput.value = userData.about);
  profileFormValidator.resetForm();
});

buttonAddNewCard.addEventListener("click", function () {
  popupFormAddCard.open();
  cardFormValidator.resetForm();
});
