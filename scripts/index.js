import initialCards from './data.js'


/* ПЕРЕМЕННЫЕ  */

let popupElement = document.querySelector('.popup');
let popupNewItem = document.querySelector('.popup-new-item');
let popupForm = document.querySelector('.popup__form');
let EditButton = document.querySelector('.profile__edit-button');
let AddButton = document.querySelector('.profile__add-button');
let CloseButton = document.querySelector('.popup__close');
let CloseButtonNewItem = document.querySelector('.popup-new-item__close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__status');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');


/* ФОРМА ДЛЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ */

let closePopup = function(){
    popupElement.classList.remove('popup_opened')
    popupImage.classList.remove('popup-image_opened')
}

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


/* ФОРМА ДЛЯ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ */

let openPopupNewItem = function(){
    popupNewItem.classList.add('popup-new-item_opened');
}

let closePopupNewItem = function(){
    popupNewItem.classList.remove('popup-new-item_opened')

}

popupForm.addEventListener('submit', function(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopupNewItem();  
}); 

AddButton.addEventListener('click', openPopupNewItem);
CloseButtonNewItem.addEventListener('click', closePopupNewItem);


  /* ДОБАВЛЕНИЕ БАЗОВЫХ КАРТОЧЕК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ */

  const ListElement = document.querySelector('.elements__list')
  const ElementTemplate =
      document.querySelector('#element-template').content.querySelector('.element')
  const form = document.querySelector('.popup-new-item__form')
  const formInputTitle = document.querySelector('[name="place-name"]')
  const formInputImage = document.querySelector('[name="place-image"]')
 
  /* ФУНКЦИЯ СОЗДАНИЯ НОВОГО ЭЛЕМЕНТА*/
function createElement(item) {

    const NewElement = ElementTemplate.cloneNode(true);
    const NewElementTitle = NewElement.querySelector('.element__title')
    const NewElementImage = NewElement.querySelector('.element__image')
    const NewElementPopupTitle = NewElement.querySelector('.popup__title')
    const NewElementPopupImage = NewElement.querySelector('.popup-image__image')
    NewElementImage.src = item.image
    NewElementPopupImage.src =  item.image
    NewElementTitle.textContent = item.title
    NewElementPopupTitle.textContent = item.title
    const popupImage = NewElement.querySelector('.popup-image')
    const NewElementLikeButton = NewElement.querySelector('.element__like')
    const NewElementDeleteButton = NewElement.querySelector('.element__trash')
    const PopupImageCloseButton = NewElement.querySelector('.popup-image__close')


    const openPopupImage = function (){
    popupImage.classList.add('popup-image_opened')
    }

    const closePopupImage = function(){
    popupImage.classList.remove('popup-image_opened')
    }

    NewElementImage.addEventListener('click', openPopupImage)
    NewElementDeleteButton.addEventListener('click', handleDeleteButtonClick)
    NewElementLikeButton.addEventListener('click', handleLikeButtonClick) 
    PopupImageCloseButton.addEventListener('click', closePopupImage);
    return NewElement;
    
}

/* ФУНКЦИЯ ДОБАВЛЕНИЯ ЛАЙКА */
const handleLikeButtonClick = (e) => {
    e.target.classList.toggle('element__like_active')
}
/* ФУНКЦИЯ УДАЛЕНИЯ ПОСТА */
const handleDeleteButtonClick = (e) => {
    e.target.closest('.element').remove()
}


const renderNewElement = (item, wrapElement) => {
    const element = createElement(item)
    wrapElement.prepend(element);
}

initialCards.forEach(function(item) {
    renderNewElement(item, ListElement)
})

const handleFormSubmit = (e) => {
    e.preventDefault()

/*  СОЗДАЕМ НОВЫЙ ОБЪЕКТ */

    const NewElement = {
        title: formInputTitle.value,
        image: formInputImage.value
    }

    renderNewElement(NewElement, ListElement)
    closePopupNewItem();  

}

form.addEventListener('submit', handleFormSubmit )