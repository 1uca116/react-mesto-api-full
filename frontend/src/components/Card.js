import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `card__button-delete ${isOwn ? 'card__button-delete_visible' : 'card__button-delete_hidden'}`
    );

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `card__button-like ${isLiked ? 'card__button-like_active' : 'card__button-like'}`
    );


    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onDelete(props.card);
    }


    return (
        <li className="card">
            <button  type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <img src={props.card.link} alt={props.card.name}
                 onClick={() => props.onCardClick(props.card)}
                 className="card__image" />
            <div className="card__info">
                <h2 className="card__name">{props.card.name}</h2>
                <div className="card__like">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="card__like_counter">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    )
};


export default Card

