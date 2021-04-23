import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup (props) {

    const avatarRef= React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(avatarRef.current.value);
        avatarRef.current.value = '';
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name={'update-avatar'}
            title={'Обновить аватар'}
            formType={'profile'}
            children={
                <div className="popup__field">
                    <input id="avatar-link-label" ref={avatarRef} className="popup__input popup__input_el_avatar-link" type="url"
                           name="avatar-link" placeholder="Фото аватара" required/>
                    <span id="avatar-link-label-error" className="popup__error"></span>
                </div>
            }
            buttonName={'Сохранить'}

        />
    )
}

export default EditAvatarPopup;