import { openPopup } from "./index.js";
const popupOpenImage = document.querySelector(".popup_open-image");
const popupImageLink = document.querySelector(".popup__image_picture");
const popupImageTitle = document.querySelector(".popup__title_picture");

export default class Card {
  constructor(title, image, templateSelector, handleCardClick) {
    this._title = title;
    this._image = image;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
   
  }
  /*  Открытие попапа с картинкой */
  _handleImageClick() {
    openPopup(popupOpenImage);
    popupImageLink.src = this._image;
    popupImageLink.alt = this._title;
    popupImageTitle.textContent = this._title;
  }

  _deleteCard() {
    this._element.remove();
  }

  _handlelikeButton(evt) {
    evt.target.classList.toggle("element__like_active");
  }

  _setEventListeners() {
    this._element.querySelector(".element__image").addEventListener("click", () => {
      this._handleImageClick();
      });
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => {
        this._deleteCard();
      });
    this._element
      .querySelector(".element__like")
      .addEventListener("click", (evt) => {
        this._handlelikeButton(evt);
      });
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const image = this._element.querySelector(".element__image");
    const title = this._element.querySelector(".element__title");

    image.src = this._image;
    image.alt = this._title;
    title.textContent = this._title;

    return this._element;
  }
}