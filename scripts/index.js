  
let popupElement = document.querySelector('.popup');
let EditButton = document.querySelector('.profile__edit-button');
let CloseButton = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let SaveButton = document.querySelector('.popup__save-button');

let openPopup = function(){
    popupElement.classList.add('popup_opened')
}

let closePopup = function () {
    popupElement.classList.remove('popup_opened')
}

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupElement.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler); 
EditButton.addEventListener('click', openPopup);
CloseButton.addEventListener('click', closePopup);