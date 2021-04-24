import React from 'react';
import { Route, Switch, Redirect, useHistory} from 'react-router-dom';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Api from '../utils/api.js';
import * as auth from '../utils/auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import ConfirmationPopup from "./ConfirmationPopup";
import ProtectedRoute from './ProtectedRoute.js';
import Register from './Register.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';
import successLogo from '../images/success__logo.svg'
import errorLogo from '../images/error__logo.svg'


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen]=React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen]=React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen]=React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard]=React.useState({});
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen]=React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({
        name: '',
        about: '',
        avatar: '',
        _id: ''
    });
    const history = useHistory();
    const [cards, setCards]=React.useState([]);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [dataInfoTool, setDataInfoTool] = React.useState({
        title: "",
        icon: ""
    });
    const [loggedIn, setLoggedIn] = React.useState(false)
    const [email, setEmail] = React.useState("");



    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleInfoTooltipClick() {
        setIsInfoTooltipOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsImagePopupOpen(false)
        setIsConfirmationPopupOpen(false)
        setSelectedCard(null)
        setIsInfoTooltipOpen(false)
    }

    function handleCardClick(card) {
        setSelectedCard(card)
        setIsImagePopupOpen(true)
    }
    function handleCardDeleteClick(card){
        setIsConfirmationPopupOpen(true)
    }

    function handleUpdateUser(name, about) {
        Api.editUserInfo(name, about)
            .then(data => {
                setCurrentUser({
                    _id: data.data._id,
                    name: data.data.name,
                    avatar: data.data.avatar,
                    about: data.data.about
                });
                closeAllPopups();
            })
            .catch(e => console.log(e));
    }

    function handleUpdateAvatar(avatar) {
        Api.updateAvatar(avatar)
            .then(data => {
                setCurrentUser({
                    _id: data.data._id,
                    name: data.data.name,
                    avatar: data.data.avatar,
                    about: data.data.about
                });
                closeAllPopups();
            })
            .catch (e => console.log(e));
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        if (isLiked) {
            Api.dislikeCard(card._id)
                .then((newCard) => {
                    const newCards = cards.map((c) => c._id === card._id ? newCard.data : c);
                    setCards(newCards)

                }).catch(err => console.log(err));
        } else {
            Api.likeCard(card._id)
                .then((newCard) => {
                    const newCards = cards.map((c) => c._id === card._id ? newCard.data : c);
                    setCards(newCards)
                }).catch(err => console.log(err));

        }
    }

    function handleCardDelete(card) {
        Api.deleteCard(card._id)
            .then( _ => {
                const newCards = cards.filter(c => c._id !== card._id);
                setCards(newCards)
            }).catch(err => console.log(err));
    }

    function handleAddPlace(name, link) {
        Api.addCard(name, link)
            .then((newCard) => {
                setCards([newCard.data, ...cards]);
                closeAllPopups();
            }).catch(err => console.log(err));
    }

    function handleRegister(email, password) {
        auth.register(email, password)
            .then((data) => {
                console.log(data);
                setDataInfoTool({ title: "Вы успешно зарегистрировались!", icon: successLogo });
                handleInfoTooltipClick();
            })
            .catch((error) => {
                console.error(error);
                setDataInfoTool({ title: "Что-то пошло не так! Попробуйте ещё раз.", icon: errorLogo });
                handleInfoTooltipClick();
            })
        history.push("/sign-in");

    }

    function handleLogin(email, password) {
        auth.authorize(email, password)
            .then(token => {
                auth.checkToken(token)
                    .then(res => {
                        setLoggedIn(true);
                        setCurrentUser({
                            _id: res.data._id,
                            name: res.data.name,
                            avatar: res.data.avatar,
                            about: res.data.about
                        });
                        setEmail(res.data.email)
                        history.push("/");
                    })
                    .catch((error) => {
                        console.error(error);
                        setDataInfoTool({ title: "Что-то пошло не так! Попробуйте ещё раз.", icon: errorLogo });
                        handleInfoTooltipClick();
                    })
            })
            .catch((error) => {
                console.error(error);
                setDataInfoTool({ title: "Что-то пошло не так! Попробуйте ещё раз.", icon: errorLogo });
                handleInfoTooltipClick();
            })
    }

    function handleCheckToken() {
        const token = localStorage.getItem("token");
        if (token) {
            auth.checkToken(token)
                .then((res) => {
                    if (res) {
                        setEmail(res.data.email);
                        setCurrentUser({
                            _id: res.data._id,
                            name: res.data.name,
                            avatar: res.data.avatar,
                            about: res.data.about
                        });
                        setLoggedIn(true);
                        history.push("/");
                    } else {
                        setDataInfoTool({ title: "Что-то пошло не так! Попробуйте ещё раз.", icon: errorLogo });
                        handleInfoTooltipClick();
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    function signOut() {
        setLoggedIn(false);
        setEmail("");
        localStorage.removeItem("token");
        history.push("/sign-in");
    }

    React.useEffect(() => {
        handleCheckToken();
    }, []);

    React.useEffect(() => {
        Api.getUserInfo()
            .then(data => {
                setCurrentUser({
                    _id: data.data._id,
                    name: data.data.name,
                    avatar: data.data.avatar,
                    about: data.data.about
                });
            })
            .catch(e => console.log(e));
    }, []);

    React.useEffect(() => {
        Api.getInitialCards().then(c => {
            setCards(c.data)
        }).catch(e => console.log(e));

    }, [])




    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container">
                    <Header
                        email={email}
                        signOut={signOut}
                    />

                    <Switch>
                        <ProtectedRoute
                            exact path="/"
                            component={Main}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            onCardDeleteClick={handleCardDelete}
                            cards={cards}
                            onCardLike={handleCardLike}
                            loggedIn={loggedIn}

                        />

                        <Route path="/sign-up">
                            <Register handleRegister={handleRegister} />
                        </Route>

                        <Route path="/sign-in">
                            <Login handleLogin={handleLogin} />
                        </Route>

                        <Route exact path="/">
                            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                        </Route>
                    </Switch>

                    <Footer />

                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>

                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

                    <ConfirmationPopup isOpen={isConfirmationPopupOpen} onClose={closeAllPopups}  onCardDeleteClick={handleCardDelete} />

                    <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} title={dataInfoTool.title} icon={dataInfoTool.icon}/>


                    { selectedCard
                        ? <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
                        : ''
                    }

                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
