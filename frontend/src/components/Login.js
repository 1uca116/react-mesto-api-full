import React from 'react';

function Login(props) {

    const [email, setEmail] = React.useState( '');
    const [password, setPassword] = React.useState('');

    function handleSubmit(event) {
        event.preventDefault();
        if (!email || !password) {
            console.log('Не введен email или пароль');
            return;
        }
        props.handleLogin(email, password);
        resetForm()
    }

    function resetForm() {
        setEmail('');
        setPassword('');
    }

    function handleChange(event) {
        if (event.target.name === 'Email') {
            setEmail(event.target.value);
        } else if (event.target.name === 'Password') {
            setPassword(event.target.value);
        }
    }
    return (
        <section className="sign">
            <h3 className="sign__title">Вход</h3>
            <form className="sign__form" name="formSign" onSubmit={handleSubmit} noValidate>
                <input value={email} onChange={handleChange} className="sign__input" name="Email"
                       type="email" autoComplete="off" placeholder="Email" required/>
                <input value={password} onChange={handleChange} className="sign__input" name="Password"
                       type="password" autoComplete="off" placeholder="Пароль" required/>
                <button className="sign__button link" type="submit">
                    Войти
                </button>
            </form>
        </section>
    )
}
export default Login