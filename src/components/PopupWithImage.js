
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageLink = this._popupElement.querySelector(
      ".popup__image_picture"
    );
    this._popupImageTitle = this._popupElement.querySelector(
      ".popup__title_picture"
    );
  }
  open(name, link) {
    super.open();
    this._popupImageLink.src = link;
    this._popupImageLink.alt = link;
    this._popupImageTitle.textContent = name;
  }
}