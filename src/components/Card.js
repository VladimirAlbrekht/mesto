export default class Card {
  constructor(
    { data, handleCardClick, handleTrashClick, handleLikeClick },
    templateSelector,
    userId
  ) {
    this._title = data.name;
    this._image = data.link;
    this._idOwner = data.owner._id;
    this._idCard = data._id;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
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
    this._buttonLike = this._element.querySelector(".element__like");
    this._cardImage = this._element.querySelector(".element__image");
    this._deleteButton = this._element.querySelector(".element__trash");
    this._cardTitle = this._element.querySelector(".element__title");
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;

    if (this._userId !== this._idOwner) {
      this._deleteButton.remove();
    }

    this.setLikes(this._likes);
    this._setEventListeners();
    return this._element;
  }

  deleteCardBrowser() {
    this._element.remove();
    this._element = null;
  }

  _checkLike() {
    return this._likes.some((like) => {
      return like._id === this._userId;
    });
  }

  setLikes(items) {
    this._element.querySelector(".element__like-sum").textContent =
      items.length;
    this._likes = items;
    if (this._checkLike()) {
      this._buttonLike.classList.add("element__like_active");
    } else {
      this._buttonLike.classList.remove("element__like_active");
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", (evt) => {
      this._handleCardClick(this._title, this._image);
    });
    this._deleteButton.addEventListener("click", () =>
      this._handleTrashClick(this._idCard, this)
    );
    this._buttonLike.addEventListener("click", () => {
      this._handleLikeClick(this._idCard, this._checkLike(), this);
    });
  }
}