import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup (props) {

    const [name, setName]=React.useState('');
    const [link, setLink]=React.useState('');

    function handleCardNameChange(evt) {
        setName(evt.target.value);
    }

    function handleCardLinkChange(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddPlace(name, link);
        setName('');
        setLink('');
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name={'add-card'}
            title={'Новое место'}
            formType={'add-card'}
            children={
                <>
                    <div className="popup__field">
                        <input id="card-name-label" onChange={event => handleCardNameChange(event)} value={name}
                               className="popup__input popup__input_el_card-name" type="text"
                               name="card-name"
                               placeholder="Название" minLength="2" maxLength="30" required/>
                        <span id="card-name-label-error" className="popup__error"></span>
                    </div>
                    <div className="popup__field">
                        <input id="card-link-label" onChange={event => handleCardLinkChange(event)} value={link}
                               className="popup__input popup__input_el_card-link" type="url"
                               name="card-link"
                               placeholder="Ссылка на картинку" required/>
                        <span id="card-link-label-error" className="popup__error"></span>
                    </div>
                </>
            }
            buttonName={'Создать'}
        />
    )
}

export default AddPlacePopup;