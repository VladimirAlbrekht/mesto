// --- КЛАСС ОТКРЫТИЯ/ЗАКРЫТИЯ ПОПАПОВ ---

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector);
    this._popupCloseButton = this._popupElement.querySelector(".popup__close");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  //функция обработки нажатия клавиши Esc для закрытия попапа
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //функция обработки клика за пределами области popup__container
  _handlePopupClick(evt) {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener("click", () => this.close());
    this._popupElement.addEventListener("mousedown", (evt) =>
      this._handlePopupClick(evt)
    );
  }
}

