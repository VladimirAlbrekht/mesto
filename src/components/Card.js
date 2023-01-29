export default class Card {
  constructor(title, image, templateSelector, handleCardClick) {
    this._title = title;
    this._image = image;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

 _handlelikeButton() {
    this._buttonLike.classList.toggle("element__like_active");
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", (evt) => {this._handleCardClick(this._title, this._image);});
    this._element.querySelector(".element__trash").addEventListener("click", () => {this._deleteCard();});
    this._buttonLike.addEventListener("click", () => {this._handlelikeButton();});
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
    this._buttonLike = this._element.querySelector('.element__like');
    this._cardImage = this._element.querySelector(".element__image");
    this._setEventListeners();
    this._cardTitle = this._element.querySelector(".element__title");
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;

    return this._element;
  }
}