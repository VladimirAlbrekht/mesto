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
  setUserInfo({name, about, avatar}) {
    this._elementName.textContent = name;
    this._elementDescription.textContent = about;
    this._avatar.src = avatar;
  } 

} 

 