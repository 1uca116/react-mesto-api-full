import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup(props) {

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onDelete(props.card._id);
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name={'popup_confirmation'}
            title={'Вы уверены?'}
            formType={'confirmation'}
            buttonName={'Да'}
        />
    )
}

export default ConfirmationPopup