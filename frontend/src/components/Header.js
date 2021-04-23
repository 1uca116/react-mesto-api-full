import React from 'react';
import { Route, Link } from 'react-router-dom';
import headerLogo from '../images/header__logo.svg';

function Header (props) {
    const [isMenuClick, setMenuClick] = React.useState(false);

    function handleMenuClick() {
        setMenuClick(!isMenuClick);
    }
    return (
        <header className="header">
            <div className={`header__nav ${isMenuClick ? "header__nav_content" : ""}`}>
                <img className={`header__logo ${isMenuClick ? "header__logo_box-nav" : ""}`}
                     src={headerLogo} alt="Лого Место" />
                <Route exact path="/">
                    <div className={`header__button-nav ${isMenuClick ? "header__button-nav_close" : ""}`}
                         onClick={handleMenuClick}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <div className={`header__info ${isMenuClick ? "header__info_box-nav" : ""}`}>
                        <p className="header__user-email">{props.email}</p>
                        <Link to="/sign-in" className="header__out" onClick={() => {
                            props.signOut();
                            handleMenuClick();
                        }}>Выйти</Link>
                    </div>
                </Route>

                <Route path="/sign-in">
                    <div className="header__sign-box">
                        <Link to="/sign-up" className="header__sign">Регистрация</Link>
                    </div>
                </Route>

                <Route path="/sign-up">
                    <div className="header__sign-box">
                        <Link to="/sign-in" className="header__sign">Войти</Link>
                    </div>
                </Route>
            </div>
        </header>
    );
}

export default Header;