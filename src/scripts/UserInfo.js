export default class UserInfo {
  constructor({ selectorName, selectorDescription }) {
    this._name = selectorName;
    this._description = selectorDescription;
  }

  //Подгружаем текущие данные из инпутов при открытии попапа
  getUserInfo(name, about) {
    (name.value = this._name.textContent),
      (about.value = this._description.textContent);
  }

  //Сохраняем введенные значения из инпутов в нужные поля
  setUserInfo(name, about) {
    this._name.textContent = name.value;
    this._description.textContent = about.value;
  }
}
