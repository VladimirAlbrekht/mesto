import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  config,
  popupEditProfileContainer,
  popupAddCardForm,
  buttonEditProfile,
  buttonAddNewCard,
  nameInput,
  jobInput,
  buttonChangeAvatar,
  popupChangeAvatar,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

import "./../pages/index.css";

//добавляем экземпляр класса  Api c данными пользователя
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "4ad205f5-51c6-4198-8b11-26d3d2a06600",
    "Content-Type": "application/json",
  },
});

//добавляем объект UserInfo
const userInfo = new UserInfo({
  selectorName: ".profile__name",
  selectorDescription: ".profile__status",
  selectorAvatar: ".profile__avatar",
});

//создаем экземпляр класса Section
const cardList = new Section(
  {
    renderer: (cardItem, id) => {
      cardList.addItem(createCard(cardItem, id));
    },
  },
  ".elements__list"
);

//добавляем экземпляры класса для валидации
const profileFormValidator = new FormValidator(
  config,
  popupEditProfileContainer
);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, popupAddCardForm);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(config, popupChangeAvatar);
avatarFormValidator.enableValidation();

//добавляем экземпляр класса модальных окон
const popupWithConfirm = new PopupWithConfirmation("#popup-confirm");
popupWithConfirm.setEventListeners();

const popupWithImage = new PopupWithImage("#popup-image");
popupWithImage.setEventListeners();

const popupFormAddCard = new PopupWithForm(
  ".popup_add-new-card",
  handlePopupAddCard
);
popupFormAddCard.setEventListeners();

const popupFormProfile = new PopupWithForm(
  ".popup_edit-profile",
  handlePopupProfile
);
popupFormProfile.setEventListeners();

const popupFormChangeAvatar = new PopupWithForm(
  ".popup_change-avatar",
  handlePopupChangeAvatar
);
popupFormChangeAvatar.setEventListeners();

//функция открытия карточки с картинкой
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

//функция добавления новых карточек от пользователя (сабмит формы)
function handlePopupAddCard(inputsData) {
  const imageValue = inputsData["place-image"];
  const titleValue = inputsData["place-name"];
  popupFormAddCard.renderSaving(true);
  api
    .postNewCard({name:titleValue, link:imageValue})
    .then((data) => {
      cardList.addItem(createCard(data, data.owner._id));
      popupFormAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormAddCard.renderSaving(false);
    });
}

//функция открытия попапа с подтверждением удаления карточки
function handleTrashClick(id, card) {
  popupWithConfirm.setSubmitAction(() => handlePopupConfirm(id, card));
  popupWithConfirm.open();
}

//функция удаления карточки
function handlePopupConfirm(id, card) {
  popupWithConfirm.renderSaving(true);
  api
    .deleteCardServer(id)
    .then(() => {
      card.deleteCardBrowser();
      popupWithConfirm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithConfirm.renderSaving(false);
    });
}

// функция добавления/удаления лайка
function handleLikeClick(id, isLiked, card) {
  if (isLiked) {
    api
      .dislikedCard(id)
      .then((data) => {
        card.setLikes(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .likedCard(id)
      .then((data) => {
        card.setLikes(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// функция для редактирования профиля
function handlePopupProfile(inputsData) {
  popupFormProfile.renderSaving(true);
  console.log(inputsData);
  api
    .saveUserChanges(inputsData)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupFormProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormProfile.renderSaving(false);
    });
}

//функция для редактирования аватара
function handlePopupChangeAvatar(inputsData) {
  popupFormChangeAvatar.renderSaving(true);

  api
    .changedAvatar(inputsData)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupFormChangeAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormChangeAvatar.renderSaving(false);
    });
}

//функция подгрузки в инпуты данных профиля
function handleTextInput() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
}

//функция создания карточек
function createCard(dataCard, id) {
  const card = new Card(
    {
      data: dataCard,
      handleCardClick,
      handleTrashClick,
      handleLikeClick,
    },
    "#element-template",
    id
  );

  const newCard = card.generateCard();

  return newCard;
}

//добавляем слушатели событий для кнопок
buttonEditProfile.addEventListener("click", () => {
  popupFormProfile.open();
  handleTextInput();
  profileFormValidator.resetForm();
});

buttonAddNewCard.addEventListener("click", function () {
  popupFormAddCard.open();
  cardFormValidator.resetForm();
});

buttonChangeAvatar.addEventListener("click", function () {
  popupFormChangeAvatar.open();
  cardFormValidator.resetForm();
});

//добавляем Promise.all дожидаемся подгрузки данных и карточек
Promise.all([api.getUserData(), api.getInitialCards()])
  .then((values) => {
    userInfo.setUserInfo(values[0]);
    cardList.renderCards(values[1].reverse(), values[0]._id);
  })
  .catch((err) => {
    console.log(err);
  });