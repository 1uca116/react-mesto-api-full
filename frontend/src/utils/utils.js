import {FormValidator} from "../components/FormValidator";

export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const nameInput = document.querySelector('.popup__input_el_name');
export const jobInput = document.querySelector('.popup__input_el_job');


export const selectors = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_visible'
}

export const cardTemplateContent = document.querySelector('#card-template').content;


export const editButton = document.querySelector('.profile__edit');
export const addCardButton = document.querySelector('.profile__add-card');
export const profileOverlayButton = document.querySelector('.profile__overlay');
export const popupProfileForm = document.querySelector('.popup__form_profile');
export const addCardForm = document.querySelector('.popup__form_add-card');
export const avatarEditForm = document.querySelector('.popup_update-avatar');
