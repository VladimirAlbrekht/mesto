let popupElement = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let EditButton = document.querySelector('.profile__edit-button');
let CloseButton = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__status');

let closePopup = function(){
    popupElement.classList.remove('popup_opened')
}

let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');

let openPopup = function(){
    popupElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

popupForm.addEventListener('submit', function(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();  
}); 

EditButton.addEventListener('click', openPopup);
CloseButton.addEventListener('click', closePopup);