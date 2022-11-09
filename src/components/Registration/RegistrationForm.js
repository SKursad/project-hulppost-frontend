import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import api from '../../api/api-calls';
import DispatchContext from '../../context/DispatchContext';
import Input from '../Input/Input';
import Button from '../UI/Button/Button';
import '../Input/InputForm.css';


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
    const appDispatch = useContext(DispatchContext);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        return function cleanup() {
            source.cancel();
        };
    }, [source]);

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors('');
        try {
            const response = await api.post(apiUrl, {...formValue});
            console.log(response.data);
            appDispatch({type: "flashMessage", value: "U heeft zich succesvol geregistreerd"});
            navigate(`/login`);
        } catch (e) {
            console.error(e);
            console.log(e.response.data);
            if (e.response) {
                appDispatch({type: "flashMessage", value: "Er gaat iets mis"});
                setErrors(e.response.data);
                console.log(e.response.data);
            }
        }
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
        <main>
            <div className="form-container__input">
                <Input
                    nameRegister="Email"
                    placeholder="voer een geldige E-mail"
                    label="E-mail"
                    alt="input-email"
                    type="email"
                    id="email-field"
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
                    placeholder="dd/mm/yyyy"
                    label="birthday-field"
                    alt="input-birthday"
                    type="date"
                    id="birthday-field"
                    name="birthday"
                    onChange={onChange}
                    error={birthdayError}
                    required={true}
                />
                <label htmlFor="gender-field">
                    <p id="option-box">Ik ben:</p>
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
            <div className="form-container__button">
                <Button
                    title="register-button"
                    onClick={handleSubmit}
                    disabled={passwordRepeatError}
                >
                    Registreren
                </Button>
            </div>
            <p>Je kunt na het registeren in je profielpagina een profielfoto kiezen indien gewenst</p>
            <p>Heb je al een account? Je kunt je <Link to="/login">hier</Link> inloggen.</p>
            <p>Terug naar <Link to="/">Hoofdpagina</Link></p>
        </main>
    );
};

export default RegistrationForm;