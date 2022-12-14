import initialCards from './data.js'


/* ПЕРЕМЕННЫЕ  */

const popupEditProfileContainer = document.querySelector('.popup_edit-profile');
const formEditProfile = document.querySelector('.popup__form_edit-profile');
const popupAddCard = document.querySelector('.popup_add-new-card');
const popupOpenImage = document.querySelector('.popup_open-image');
const popupImageTitle = document.querySelector('.popup__title_picture');
const popupImageLink = document.querySelector('.popup__image_picture');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const buttonCloseEditForm = document.querySelector('.popup__close_edit-form');
const buttonCloseAddForm = document.querySelector('.popup__close_add-form');
const buttonCloseImageForm = document.querySelector('.popup__close_image-form');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__status');
const nameInput = document.querySelector('[name="popup-name"]');
const jobInput = document.querySelector('[name="popup-job"]');


/* ВАЛИДАЦИЯ ФОРМ */

const checkInputValidity = (input,config) => {
    const error = document.querySelector(`#${input.id}-error`)

    if(input.validity.valid) {
        error.textContent= ''
        error.classList.remove(config.errorClass)
        input.classList.remove(config.inputErrorClass)

    } else {
        error.textContent = input.validationMessage
        error.classList.add(config.errorClass)
        input.classList.add(config.inputErrorClass)
    }

}

const toggleButton = (inputs, button, config) => {
    const isFormValid = inputs.every(input => input.validity.valid)

    if(isFormValid) {
         button.classList.remove(config.inactiveButtonClass)
         button.disabled = ''
    } else {
        button.classList.add(config.inactiveButtonClass)
        button.disabled = 'disabled'
    }
}


const enableValidation = (config) => {
    const {formSelector, inputSelector, submitButtonSelector, ...restConfig} = config
    const forms = [...document.querySelectorAll(formSelector)]

    forms.forEach(form => {
        const inputs = [...form.querySelectorAll(inputSelector) ] 
        const button = form.querySelector(submitButtonSelector)

        form.addEventListener('submit', (e) => {
            e.preventDefault()
        })


    inputs.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(input, restConfig)
            toggleButton(inputs, button, config)   
            })
        })
    })
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
})






/* ФУНКЦИИ */

const openPopup = function(item){
  item.classList.add('popup_opened');
}

const addValueProfileForm = function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

const removeValueformAddCard = function () {
    formInputTitle.value ='';
    formInputImage.value ='';
}

const closePopup = function(item){
    item.classList.remove('popup_opened')
}

/* СЛУШАТЕЛИ */

buttonEditProfile.addEventListener ('click', function () {
    openPopup(popupEditProfileContainer);
    addValueProfileForm();
});
buttonCloseEditForm.addEventListener('click', ()=> closePopup(popupEditProfileContainer));
buttonCloseImageForm.addEventListener('click', ()=> closePopup(popupOpenImage));
buttonAddNewCard.addEventListener('click', ()=> openPopup(popupAddCard));
buttonCloseAddForm .addEventListener('click', function  () {
    closePopup(popupAddCard);
    removeValueformAddCard();
} );

formEditProfile.addEventListener('submit', function(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup (popupEditProfileContainer);
}); 

buttonCloseAddForm.addEventListener('click', ()=> closePopup(popupAddCard));

  /* ДОБАВЛЕНИЕ БАЗОВЫХ КАРТОЧЕК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ */

  const listElement = document.querySelector('.elements__list')
  const elementTemplate =
      document.querySelector('#element-template').content.querySelector('.element')
  const formAddCard = document.querySelector('.popup__form_new-item')
  const formInputTitle = document.querySelector('[name="place-name"]')
  const formInputImage = document.querySelector('[name="place-image"]')
 
  /* ФУНКЦИЯ СОЗДАНИЯ НОВОГО ЭЛЕМЕНТА*/
function createElement(item) {
    const newElement = elementTemplate.cloneNode(true);
    const newElementTitle = newElement.querySelector('.element__title')
    const newElementImage = newElement.querySelector('.element__image')
    newElementImage.src = item.image
    newElementTitle.textContent = item.title
    const newElementLikeButton = newElement.querySelector('.element__like')
    const newElementDeleteButton = newElement.querySelector('.element__trash')
    newElementDeleteButton.addEventListener('click', handleDeleteButtonClick)
    newElementLikeButton.addEventListener('click', handleLikeButtonClick) 
 
    /*  ОТКРЫТИЕ ПОПАПА С КАРТИНКОЙ */
    newElementImage.addEventListener('click', function() {
        openPopup(popupOpenImage);
        popupImageLink.src = item.image
        popupImageTitle.textContent = item.title
        return newElementImage

    })
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
 /*  СОЗДАЕМ НОВЫЙ ОБЪЕКТ */
const submitAddCardForm = (e) => {
    e.preventDefault()
    closePopup(popupAddCard);
   
    const newElement = {
        title: formInputTitle.value,
        image: formInputImage.value
    }

    renderNewElement(newElement, listElement)
    removeValueformAddCard()
  
}

formAddCard.addEventListener('submit', submitAddCardForm)