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





let closePopup = function(){
    popupElement.classList.remove('popup_opened')
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


/* Form for adding */

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





/* Получаем место для темплэйта  и сам элемент */





/* EXAMPLE */

const initialCards = [
    {
      title: "Архыз",
      image:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
    },
    {
      title: "Челябинская область",
      image:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
    },
    {
      title: "Иваново",
      image:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
    },
    {
      title: "Камчатка",
      image:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
    },
    {
      title: "Холмогорский район",
      image:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
    },
    {
      title: "Байкал",
      image:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
    }
  ];

 const ListElement = document.querySelector('.elements__list')
  const ElementTemplate =
      document.querySelector('#element-template').content.querySelector('.element')
  const form = document.querySelector('.popup-new-item__form')
  const formInputTitle = document.querySelector('[name="place-name"]')
  const formInputImage = document.querySelector('[name="place-image"]')

  function createElement(item) {

    const NewElement = ElementTemplate.cloneNode(true);
    const NewElementTitle = NewElement.querySelector('.element__title')
    const NewElementImage = NewElement.querySelector('img')
    NewElementImage.src = item.image
    NewElementTitle.textContent = item.title

 /*    const todoDeleteButton = todo.querySelector('.todo__delete-button')
    const todoLikeButton = todo.querySelector('.todo__like-button') */

    // Обработчики кликов для кнопок лайка и удаления
/*     todoDeleteButton.addEventListener('click', handleDeleteButtonClick)
    todoLikeButton.addEventListener('click', handleLikeButtonClick) */

    return NewElement;
}

const renderNewElement = (item, wrapElement) => {
    const element = createElement(item)
    wrapElement.append(element);
}

initialCards.forEach(function(item) {
    renderNewElement(item, ListElement)
})

const handleFormSubmit = (e) => {
    e.preventDefault()

    // здесь мы сами создаем объект, который будем передавать в renderTodo
    const NewElement = {
        title: formInputTitle.value,
        image: formInputImage.value
    }

    renderNewElement(NewElement, ListElement)
    closePopupNewItem();  

}

form.addEventListener('submit', handleFormSubmit )


/* 

const todosList = [
    {
        title: 'Работать',
        image: 'https://images.unsplash.com/photo-1669272593111-122465978e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80'
    },
    {
        title: 'Еще работать',
    },
    {
        title: 'Прекратить работать',
    }
]


const todosListElement = document.querySelector('.todos__list')
const todoTemplate =
    document.querySelector('#todo-template').content.querySelector('.todos__item')
const form = document.querySelector('.form')
const formInput = document.querySelector('[name="place-name"]')

function createElement(item) {

    const todo = todoTemplate.cloneNode(true);
    const todoTitle = todo.querySelector('.todo__title')
    const todoDeleteButton = todo.querySelector('.todo__delete-button')
    const todoLikeButton = todo.querySelector('.todo__like-button')

    const img = todo.querySelector('img')
    img.src = item.image


    // Обработчики кликов для кнопок лайка и удаления
    todoDeleteButton.addEventListener('click', handleDeleteButtonClick)
    todoLikeButton.addEventListener('click', handleLikeButtonClick)


    todoTitle.textContent = item.title

    return todo;
}

const handleLikeButtonClick = (e) => {
    e.target.classList.toggle('todo__like-button_is-active')
}


const handleDeleteButtonClick = (e) => {
    e.target.closest('.todos__item').remove()
}


// Функция делает две вещи - создает элемент (вызывая createElement) и добавляет его на страницу
// item - объект с данными todo
// wrapElement - элемент, в который добавится наш новый todo

const renderTodo = (item, wrapElement) => {
    const element = createElement(item)
    wrapElement.append(element);
}

todosList.forEach(function(item) {
    renderTodo(item, todosListElement)
})


const handleFormSubmit = (e) => {
    e.preventDefault()

    // здесь мы сами создаем объект, который будем передавать в renderTodo
    const todo = {
        title: formInput.value
    }

    renderTodo(todo, todosListElement)

}

form.addEventListener('submit', handleFormSubmit )

 */