import initialCards from './data.js'


/* ПЕРЕМЕННЫЕ  */

const popupElement = document.querySelectorAll('.popup');
const popupForm = document.querySelector('.popup__form');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const buttonCloseEditForm = document.querySelector('.popup__close_edit-form');
const buttonCloseAddForm = document.querySelector('.popup__close_add-form');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__status');
const nameInput = document.querySelector('[name="popup-name"]');
const jobInput = document.querySelector('[name="popup-job"]');


/* ФОРМА ДЛЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ */

const openPopup = function(index){
  popupElement[index].classList.add('popup_opened');
}


const addValueProfileForm = function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}
const closePopup = function(index){
    popupElement[index].classList.remove('popup_opened')
}

editButton.addEventListener('click', ()=> openPopup(0));
editButton.addEventListener('click', addValueProfileForm);
buttonCloseEditForm.addEventListener('click',  ()=> closePopup(0));


popupForm.addEventListener('submit', function(evt) {
    evt.preventDefault(); 
    addValueProfileForm();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(0);
}); 


addButton.addEventListener('click',  ()=> openPopup(1));
buttonCloseAddForm.addEventListener('click',  ()=> closePopup(1));

  /* ДОБАВЛЕНИЕ БАЗОВЫХ КАРТОЧЕК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ */

  const listElement = document.querySelector('.elements__list')
  const elementTemplate =
      document.querySelector('#element-template').content.querySelector('.element')
  const form = document.querySelector('.popup-new-item__form')
  const formInputTitle = document.querySelector('[name="place-name"]')
  const formInputImage = document.querySelector('[name="place-image"]')
 
  /* ФУНКЦИЯ СОЗДАНИЯ НОВОГО ЭЛЕМЕНТА*/
function createElement(item) {

    const newElement = elementTemplate.cloneNode(true);
    const newElementTitle = newElement.querySelector('.element__title')
    const newElementImage = newElement.querySelector('.element__image')
    const newElementPopupTitle = newElement.querySelector('.popup__title')
    const newElementPopupImage = newElement.querySelector('.popup-image__image')
    newElementImage.src = item.image
    newElementPopupImage.src =  item.image
    newElementPopupImage.alt =  item.title
    newElementTitle.textContent = item.title
    newElementPopupTitle.textContent = item.title
    const popupImage = newElement.querySelector('.popup-image')
    const newElementLikeButton = newElement.querySelector('.element__like')
    const newElementDeleteButton = newElement.querySelector('.element__trash')
    const popupImageCloseButton = newElement.querySelector('.popup-image__close')


    const openPopupImage = function (){
    popupImage.classList.add('popup-image_opened')
    }

    const closePopupImage = function(){
    popupImage.classList.remove('popup-image_opened')
    }

    newElementImage.addEventListener('click', openPopupImage)
    newElementDeleteButton.addEventListener('click', handleDeleteButtonClick)
    newElementLikeButton.addEventListener('click', handleLikeButtonClick) 
    popupImageCloseButton.addEventListener('click', closePopupImage);
    return newElement;
    
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
    renderNewElement(item, listElement)
})

const submitNewForm = (e) => {
    e.preventDefault()

 /*  СОЗДАЕМ НОВЫЙ ОБЪЕКТ */

    const newElement = {
        title: formInputTitle.value,
        image: formInputImage.value
    }

    renderNewElement(newElement, listElement)
    closePopup(1);  

}
form.addEventListener('submit', submitNewForm)