import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.name);
    const [description, setDescription] = React.useState(currentUser.about);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateUser(name, description);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    return(
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name={'profile'}
            title={'Редактировать профиль'}
            formType={'profile'}
            children={
                <>
                    <div className="popup__field">
                        <input id="name-label" onChange= {event => handleChangeName(event)} value={name} className="popup__input popup__input_el_name" type="text" name="profile-name"
                               placeholder="Имя" minLength="2" maxLength="40" required/>
                        <span id="name-label-error" className="popup__error"></span>
                    </div>
                    <div className="popup__field">
                        <input id="job-label" onChange={event => handleChangeDescription(event)} value={description}className="popup__input popup__input_el_job" type="text" name="profile-job"
                               placeholder="О себе" minLength="2" maxLength="200" required/>
                        <span id="job-label-error" className="popup__error"></span>
                    </div>
                </>
            }
            buttonName={'Сохранить'}
        />
    )
}

export default EditProfilePopup;