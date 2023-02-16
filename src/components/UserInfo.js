export default class UserInfo {
  constructor({ selectorName, selectorDescription, selectorAvatar }) {
    this._elementName = document.querySelector(selectorName);
    this._elementDescription = document.querySelector(selectorDescription);
    this._avatar = document.querySelector(selectorAvatar);
    this._userId = null;
  }

  //Подгружаем текущие данные из инпутов при открытии попапа
  getUserInfo() {
    return (this._userData = {
      name: this._elementName.textContent,
      about: this._elementDescription.textContent,
    });
  }
  
  //Сохраняем введенные значения из инпутов в нужные поля
  setUserInfo(data) {
    this._elementName.textContent = data.name;
    this._elementDescription.textContent = data.about;
    this._avatar.src = data.avatar;
  } 

} 

 