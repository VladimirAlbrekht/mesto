let popupElement = document.querySelector('.popup');
let EditButton = document.querySelector('.profile__edit-button');
let CloseButton = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__status');


let closePopup = function(){
    popupElement.classList.remove('popup_opened')
}

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');

let openPopup = function(){
    popupElement.classList.add('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value; /* Добавляем значениие из поля инпут во внутрь тега. При повторном открытии попапа данные заносятся из полей профиля в инпуты  */
    profileJob.textContent = jobInput.value;
    popupElement.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler); 
EditButton.addEventListener('click', openPopup);
CloseButton.addEventListener('click', closePopup);