import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(event) {
        event.preventDefault();
        if (!email || !password) {
            console.log('Не введен email или пароль');
            return;
        }
        props.handleRegister(email, password);
        resetForm()
    }

    function handleChange(event) {
        if (event.target.name === 'Email') {
            setEmail(event.target.value);
        } else if (event.target.name === 'Password') {
            setPassword(event.target.value);
        }
    }

    function resetForm() {
        setEmail('');
        setPassword('');
    }

    return (
        <section className="sign">
            <h3 className="sign__title">Регистрация</h3>
            <form className="sign__form" name="formSign" onSubmit={handleSubmit} noValidate>
                <input value={email} onChange={handleChange} className="sign__input" name="Email"
                       type="email" autoComplete="off" placeholder="Email" required />
                <input value={password} onChange={handleChange} className="sign__input" name="Password"
                       type="password" autoComplete="off" placeholder="Пароль" required />
                <button className="sign__button link" type="submit">
                    Зарегистрироваться
                </button>
            </form>
            <p className="sign__text">
                Уже зарегистрированы?{" "}
                <Link to="/sign-in" className="sign__link">
                    Войти
                </Link>
            </p>
        </section>
    );
}

export default Register;
