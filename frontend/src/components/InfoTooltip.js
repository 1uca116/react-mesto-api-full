import React from 'react';

function InfoTooltip(props) {
    return (
        <div className={`popup popup-tool ${props.isOpen ? 'popup_opened' : false}`}>
            <div className="popup__container">
                <button onClick={props.onClose} className="popup__button-close link" type="button"></button>
                <img className="popup__tool-logo" src={props.icon} alt="Лого статус" />
                <h3 className="popup__title popup__title_info">{props.title}</h3>
            </div>
        </div>
    );
}

export default InfoTooltip;