import React from "react";

function PopupWithForm(props) {

    return(
        <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button onClick={props.onClose} className="popup__button-close link" type="button"></button>
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" onSubmit={event => props.onSubmit(event)} name={`popup__form_${props.formType}`} noValidate>
                    {props.children}
                    <button className="popup__button-save" type="submit">{props.buttonName}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm