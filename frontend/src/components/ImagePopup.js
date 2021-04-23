import React from "react";

function ImagePopup(props) {
    return (
        <div className={`popup popup_open-picture ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_picture">
                <button type="button" onClick={props.onClose} className="popup__button-close link"></button>
                <img className="popup__picture"
                     src={props.card.link}
                     alt={props.card.name}
                />
                <h3 className="popup__description">{props.card.name}</h3>
            </div>
        </div>
    )
}

export default ImagePopup