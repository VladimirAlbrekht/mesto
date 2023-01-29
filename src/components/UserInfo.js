export default class UserInfo {
  constructor({ selectorName, selectorDescription }) {
    this._name = document.querySelector(selectorName);
    this._description = document.querySelector(selectorDescription);
  }

  //Подгружаем текущие данные из инпутов при открытии попапа
  getUserInfo() {
    return (this._userData = {
      name: this._name.textContent,
      about: this._description.textContent,
    });
  }

  //Сохраняем введенные значения из инпутов в нужные поля
  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._description.textContent = about;
  }
}
