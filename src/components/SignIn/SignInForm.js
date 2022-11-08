import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import api from '../../api/api-calls';
import Input from '../Input/Input';
import Button from '../UI/Button/Button';
import {Link, useNavigate} from 'react-router-dom';

let initialState = {
    email: null,
    username: null,
};

function SignInForm({apiUrl, source}) {
    const [formValue, setFormValue] = useState(initialState);
    const [error, toggleError] = useState(false);
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        return function cleanup() {
            source.cancel();
        };
    }, [source]);

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);

        try {
            const result = await api.post(apiUrl, {...formValue});
            // console.log(result.data);
            login(result.data.accessToken);
            navigate(`/request-search`);

        } catch (e) {
            if (e.response) {
                console.log(e.response.data);
            } else {
                console.log(`Fout: ${e.message}`);
            }
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
        <main>
            <div className="form-container__input">
                <Input
                    label="username-field"
                    nameLogin="E-mailadres of Gebruikersnaam"
                    type="username"
                    id="username-field"
                    name="username"
                    placeholder="E-mail/Gebruikersnaam"
                    // value={username}
                    autoFocus={true}
                    onChange={onChange}
                />
                <Input
                    label="password-field"
                    nameLogin="Wachtwoord"
                    type="password"
                    id="password-field"
                    name="password"
                    autoComplete="false"
                    // value={password}
                    onChange={onChange}
                />
            </div>
            {error &&
                <p id="error">Combinatie van gebruikersnaam of E-mail en wachtwoord is onjuist</p>}
            <div className="form-container__button">

                <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!buttonEnabled}
                >
                    Inloggen
                </Button>
            </div>
            <p>Heb je nog geen account? Registreer <Link to="/register/help-seeker">hier</Link> als je een hulpvraag
                hebt.</p>
            <p>Of registreer op <Link to="/register/volunteer"> hier </Link> te klikken als je hulp wilt bieden als
                vrijwilliger.</p>
            <p>Terug naar de <Link to="/">Hoofdpagina</Link></p>
        </main>
    );
}

export default SignInForm;