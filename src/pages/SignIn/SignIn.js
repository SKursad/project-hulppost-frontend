import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/auth-context';
import api from '../../api/api-calls'
import Screen from '../../components/UI/Screen/Screen';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/Input/Input';

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const { login } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(false);

        try {
            const result = await api.post('/auth/login', {
                username : username,
                password : password,
            });
            console.log(result.data);

            login(result.data.accessToken);

        } catch(e) {
            console.error(e);
            setError(true);
        }
    }

        const buttonEnabled = username && password;

        return (
            <Screen title="Login">
                <h1>Inloggen</h1>
                <p> Test </p>

                <form onSubmit={handleSubmit} className="formContainer">
                    <div className="loginForm">
                        <div className="loginFormItem">
                            E-mailadres of Gebruikersnaam:
                            <Input
                                label="username-field"
                                type="username"
                                id="username-field"
                                name="username"
                                placeholder="E-mailadres of Gebruikersnaam"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    Wachtwoord:
                    <Input
                        label="password-field"
                        type="password"
                        id="password-field"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {setError &&
                        <p className="error">Combinatie van gebruikersnaam of E-mail en wachtwoord is onjuist</p>}

                    <Button
                        type="submit"
                        className="form-button"
                        disabled={buttonEnabled || error}
                    >
                        Inloggen
                    </Button>
                </form>

                <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
                <p>Terug naar de <Link to="/">Hoofdpagina</Link></p>
            </Screen>
        );
}

export default SignIn;