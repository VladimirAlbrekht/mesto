// --- КЛАСС СОЗДАНИЯ ПОПАПА С ИЗОБРАЖЕНИЕМ ---

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageLink = this._popupElement.querySelector('.popup__image_picture');
    this._popupImageTitle = this._popupElement.querySelector('.popup__title_picture');
  }
  open(title, image) {
    super.open();
    this._popupImageLink.src = image;
    this._popupImageLink.alt = image;
    this._popupImageTitle.textContent = title;
  } 
}

