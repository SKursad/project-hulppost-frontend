import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/api-calls';
import Input from '../Input/Input';
import Button from '../UI/Button/Button';
import { Link, useNavigate } from 'react-router-dom';

let initialState = {
    username: '',
    password: '',
};

function SignInForm({ apiUrl, source }) {
    const [formValue, setFormValue] = useState(initialState);
    const [error, setError] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        return function cleanup() {
            source.cancel();
        };
    }, [source]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(false);

        try {
            const result = await api.post(apiUrl, { ...formValue });
            login(result.data.accessToken);
            navigate(`/request-search`);
        } catch (e) {
            if (e.response && e.response.data) {
                setError(e.response.data.message);
            } else {
                console.error(e);
                setError('Er is een fout opgetreden. Probeer het later opnieuw.');
            }
        }
    }

    const onChange = (event) => {
        let { name, value } = event.target;
        setError(false);
        setFormValue({ ...formValue, [name]: value });
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
                    onChange={onChange}
                />
            </div>
            {error && <p id="error">{error}</p>}
            <div className="form-container__button">
                <Button type="submit" onClick={handleSubmit} disabled={!buttonEnabled}>
                    Inloggen
                </Button>
            </div>
            <p>Heb je nog geen account? Registreer <Link to="/register/help-seeker">hier</Link> als je een hulpvraag hebt.</p>
            <p>Of registreer op <Link to="/register/volunteer">hier</Link> te klikken als je hulp wilt bieden als vrijwilliger.</p>
            <p>Terug naar de <Link to="/">Hoofdpagina</Link></p>
        </main>
    );
}

export default SignInForm;