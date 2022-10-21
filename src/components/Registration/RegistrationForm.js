import Input from '../Input/Input';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import api from '../../api/api-calls';
import './RegistrationForm.css';


let initialState = {
    email: null,
    username: null,
    password: null,
    passwordRepeat: null,
    firstName: null,
    surname: null,
    birthday: null,
    gender: null,
    zipCode: null
};

const RegistrationForm = ({source, apiUrl}) => {
    const [formValue, setFormValue] = useState(initialState);
    const [error, toggleError] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, toggleLoading] = useState(false);
    const {id} = useParams();
    // const source = axios.CancelToken.source();
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
            // const [username, email, ] = form
            const response = await api.post(apiUrl, {...formValue});

            console.log(response.data);
            // navigate(`/profileEdit/${id}`);
        } catch (e) {
            toggleError(false);
            console.error(e);
            console.log(e.response.data);
            if (e.response.data) {
                toggleError(true);
                setErrors(e.response.data);

            }
            toggleError(false);
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


    let passwordRepeatError;
    if (formValue.password !== formValue.passwordRepeat) {
        passwordRepeatError = ('Wachtwoorden komen niet overeen');
    }

    const onChange = (event) => {
        let {name, value} = event.target;
        setErrors((previousErrors) => ({...previousErrors, [name]: undefined}));
        setFormValue(({...formValue, [name]: value}));
    };

    return (
        <>
            <form className="form-container">
                <div className="form-container__input">
                    <Input
                        nameRegister="Email"
                        placeholder="voer een geldige E-mail"
                        label="E-mailadres: "
                        alt="input-email"
                        type="email"
                        id="email-field"
                        // value={email}
                        name="email"
                        autoFocus={true}
                        onChange={onChange}
                        error={emailError}
                    />
                    <Input
                        nameRegister="Gebruikersnaam"
                        placeholder="kies een naam"
                        label="username-field"
                        alt="input-username"
                        type="text"
                        id="username-field"
                        name="username"
                        onChange={onChange}
                        error={usernameError}
                    />
                    <Input
                        nameRegister="Voornaam"
                        placeholder="voer uw naam in"
                        label="firstName-field"
                        alt="input-firstName"
                        type="text"
                        id="firstName-field"
                        name="firstName"
                        onChange={onChange}
                        error={firstNameError}
                    />
                    <Input
                        nameRegister="Achternaam"
                        placeholder="voer uw achternaam in"
                        label="surname-field"
                        alt="input-username"
                        type="text"
                        id="surname-field"
                        name="surname"
                        onChange={onChange}
                        error={surnameError}
                    />
                    <Input
                        nameRegister="Geboortedatum"
                        placeholder="dd/mm/jjjj"
                        label="birthday-field"
                        alt="input-birthday"
                        type="date"
                        id="birthday-field"
                        name="birthday"
                        onChange={onChange}
                        error={birthdayError}
                    />
                    <label htmlFor="gender-field">
                        <small>Gender:</small>
                        <select
                            id="gender-field"
                            name="gender"
                            // value={gender}
                            onChange={onChange}
                        >
                            <option value=""/>
                            <option value="M"> Man</option>
                            <option value="V"> Vrouw</option>
                        </select>
                        {genError &&
                            <small className="gen-error">{genError}</small>}
                    </label>
                    <Input
                        nameRegister="Postcode"
                        placeholder="1000AA"
                        label="zipCode-field"
                        alt="input-zipCode"
                        type="text"
                        id="zipCode-field"
                        name="zipCode"
                        onChange={onChange}
                        error={zipCodeError}
                    />
                    <Input
                        nameRegister="Wachtwoord"
                        placeholder="kies een wachtwoord"
                        label="Password-field"
                        alt="input-password"
                        autoComplete="false"
                        type="password"
                        id="password-field"
                        name="password"
                        onChange={onChange}
                        error={passwordError}
                    />
                    <Input
                        nameRegister="Herhaal wachtwoord"
                        placeholder="herhaal uw wachtwoord"
                        label="Password-repeat-field"
                        alt="input-password-repeat"
                        autoComplete="false"
                        type="password"
                        id="password-field-repeat"
                        name="passwordRepeat"
                        onChange={onChange}
                        error={passwordRepeatError}
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="form-button"
                    disabled={loading || !errors}
                >
                    Registreren
                </button>
            </form>

            <p>Heb je al een account? Je kunt je <Link to="/login">hier</Link> inloggen.</p>
            <p>Terug naar <Link to="/">Hoofdpagina</Link></p>
        </>
    );
};

export default RegistrationForm;