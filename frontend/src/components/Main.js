import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Main (props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__about">
                    <img src={currentUser.avatar} style={{ backgroundImage: `url(${currentUser.avatar})` }}  alt="Фото пользователя" className="profile__photo"/>
                    <div className="profile__overlay" onClick={props.onEditAvatar}></div>
                    <div className="profile__info">
                        <div className="profile__description">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button type="button" onClick={props.onEditProfile} className="profile__edit link"></button>
                        </div>
                        <p className="profile__job">{currentUser.about}</p>
                    </div>
                </div>
                <button type="button" onClick={props.onAddPlace} className="profile__add-card link"></button>
            </section>
            <ul className="places">
                {props.cards.map(c => (
                    <Card card={c}
                          key={c['_id']}
                          onCardClick={props.onCardClick}
                          onDelete={props.onCardDeleteClick}
                          onCardLike={props.onCardLike}
                          onCardDelete={props.onCardDelete}
                    />
                    )
                )}
            </ul>
        </main>
    );
}

export default Main;