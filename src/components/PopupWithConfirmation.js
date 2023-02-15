import PopupWithForm from "./PopupWithForm.js";

export default class PopupWithConfirm extends PopupWithForm {
  constructor(popupSelector) {
    super(popupSelector);
    this._buttonConfirm = this._popupElement.querySelector(".popup__form");
  }

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
  }

  renderSaving(status) {
    super.renderSaving(status);
  }

  setEventListeners() {
    this._buttonConfirm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
  }
}
