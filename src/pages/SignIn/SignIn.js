import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/auth-context';
import api from '../../api/api-calls';
import Screen from '../../components/UI/Screen/Screen';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/Input/Input';
import './SignIn.css';

let initialState = {
    email: null,
    username: null,
}

function SignIn() {
    const [formValue, setFormValue] = useState(initialState);
    const [error, toggleError] = useState(false);
    const {login} = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);

        try {
            const result = await api.post('/auth/login', {...formValue});
            console.log(result.data);
            login(result.data.accessToken);

        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }

    const onChange = (event) => {
        let {name, value} = event.target;
        toggleError(false);
        setFormValue(({...formValue, [name]: value}));
    };


    const buttonEnabled = formValue.username && formValue.password;

    return (
        <Screen title="Inloggen" wide={true}>
            <h2>Inloggen</h2>
            <p> Voer uw gegevens in om te kunnen inloggen </p>

            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-container__input">
                   <p className="form-container__p">
                       E-mailadres of Gebruikersnaam:</p>
                    <Input
                        label="username-field"
                        type="username"
                        id="username-field"
                        name="username"
                        placeholder="E-mail/Gebruikersnaam"
                        // value={username}
                        autoFocus={true}
                        onChange={onChange}
                    />
                    <p className="form-container__p">
                    Wachtwoord:
                    </p>
                    <Input
                        label="password-field"
                        type="password"
                        id="password-field"
                        name="password"
                        autoComplete="false"
                        // value={password}
                        onChange={onChange}
                    />
                </div>


                {error &&
                    <p className="error">Combinatie van gebruikersnaam of E-mail en wachtwoord is onjuist</p>}

                <Button
                    type="submit"
                    className="form-button"
                    disabled={!buttonEnabled}
                >
                    Inloggen
                </Button>
            </form>

            <p>Heb je nog geen account? <Link to="/register/help-seeker">Registreer</Link> hier als je hulp zoekt.</p>
            <p>Of <Link to="/register/volunteer">registreer</Link> hier als je hulp wilt bieden als vrijwilliger.</p>
            <p>Terug naar de <Link to="/">Hoofdpagina</Link></p>
        </Screen>
    );
}

export default SignIn;