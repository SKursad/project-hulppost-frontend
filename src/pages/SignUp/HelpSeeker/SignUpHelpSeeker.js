import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import api from '../../../api/api-calls'
import Input from '../../../components/Input/Input';
import Screen from '../../../components/UI/Screen/Screen';

const SignUpHelpSeeker = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [zipCode, setZipCode] = useState('');



    const [error, toggleError] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, toggleLoading] = useState(false);


    const source = axios.CancelToken.source();
    const navigate = useNavigate();


    useEffect(() => {
        return function cleanup() {
            source.cancel();
        };
    }, [source]);

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors('');
        toggleError(false);
        toggleLoading(true);

        try {
            await api.post('/auth/registration/helpSeeker', {
                email,
                password,
                username,
                firstName,
                surname,
                birthday,
                gender,
                zipCode
            });

            console.log();
            navigate('/');
        } catch (e) {
            console.error(e);
            console.log(e.response.data);
            toggleError(true);
            if (e.response.data) {
                setErrors(e.response.data);
            }
        }
        toggleLoading(false);
    }

    const {
        username: usernameError,
        email: emailError,
        password: passwordError,
        firstName: firstNameError,
        surname: surnameError,
        birthday: birthdayError,
        gender: genError,
        zipCode: zipCodeError
    } = errors;

    // let passwordRepeatError;
    // if (password !== passwordRepeat) {
    //     passwordRepeatError = ('Password mismatch');
    // }


    return (
        <Screen title="Welkom">
            <h2>Registreren als Hulpvrager</h2>

            <form onSubmit={handleSubmit} className="formContainer">
                <Input
                    name="Email  "
                    placeholder="voer een geldige E-mail"
                    label="E-mailadres: "
                    alt="input-email"
                    type="email"
                    id="email-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailError}
                />
                <Input
                    name="Gebruikersnaam  "
                    placeholder="kies een naam"
                    label="username-field"
                    alt="input-username"
                    type="text"
                    id="username-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={usernameError}
                />
                <Input
                    name="Wachtwoord"
                    placeholder="kies een wachtwoord"
                    label="Password-field"
                    alt="input-password"
                    type="password"
                    id="password-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError}
                />
                <Input
                    name="Voornaam"
                    placeholder="voer uw naam in"
                    label="firstName-field"
                    alt="input-firstName"
                    type="text"
                    id="firstName-field"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    error={firstNameError}
                />
                <Input
                    name="Achternaam"
                    placeholder="voer uw achternaam in"
                    label="surname-field"
                    alt="input-username"
                    type="text"
                    id="surname-field"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    error={surnameError}
                />
                <Input
                    name="Geboortedatum"
                    placeholder="dd/mm/jjjj"
                    label="birthday-field"
                    alt="input-birthday"
                    type="text"
                    id="birthday-field"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    error={birthdayError}
                />
                <label htmlFor="gender-field">
                    <small>geslacht:</small>
                    <select
                        id="gender-field"
                        name="gender"
                        value={gender}
                        onChange={(e) => {setGender(e.target.value);}}
                    >
                        <option value=''/>
                        <option value="M"> Man </option>
                        <option value="V"> Vrouw </option>
                    </select>
                </label>

                <Input
                    name="Postcode"
                    placeholder="1000AA"
                    label="zipCode-field"
                    alt="input-zipCode"
                    type="text"
                    id="zipCode-field"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    error={zipCodeError}
                />

                <button
                    type="submit"
                    className="form-button"
                    disabled={loading }
                >
                    Registreren
                </button>

            </form>

            <p>Heb je al een account? Je kunt je <Link to="/login">hier</Link> inloggen.</p>
            <p>Terug naar <Link to="/">Hoofdpagina</Link></p>
        </Screen>
    );
}

export default SignUpHelpSeeker;