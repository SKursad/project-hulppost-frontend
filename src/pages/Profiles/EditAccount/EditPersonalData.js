import React, {useContext, useEffect, useState} from 'react';
import api from '../../../api/api-calls';
import {getToken} from '../../../helper/AccesToken/GetToken';
import {useNavigate, useParams} from 'react-router-dom';
import Input from '../../../components/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Screen from '../../../components/UI/Screen/Screen';
import {AuthContext} from '../../../context/auth-context';
import '../../../components/Input/InputForm.css'
// import {format} from 'date-fns';

let initialState = {
    firstName: "",
    surname: "",
    gender: "",
    birthday: Date(),
    zipCode: "",
};

const EditPersonalData = () => {
    const {id} = useParams();
    const [formValue, setFormValue] = useState(initialState);
    const context = useContext(AuthContext);
    const {firstName, surname, gender, birthday, zipCode} = formValue;
    const [errors, setErrors] = useState({});
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        getAccountById(id);
    }, [id]);

    const getAccountById = async (id) => {
        const accountData = await api.get(`/api/v1/accounts/${id}`, getToken());
        if (accountData.status === 200) {
            setFormValue({...accountData.data});
            // setIsLoading(false)
            console.log(accountData);
        } else {
            // appDispatch({type: "flashMessage", value: "Er ging iets mis"});
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors('');
        toggleLoading(true);

        try {

            const updateAccountData = {...formValue};
            const response = await api.put(`/api/v1/accounts/${id}`,
                updateAccountData, getToken());
            console.log(response.data);
            if (response.status === 200) {
                setFormValue({
                    firstName: "",
                    surname: "",
                    gender: "",
                    birthday: Date(),
                    zipCode: ""
                });
                if (context.user.roles === "ROLE_VOLUNTEER") {
                    navigate(`/profile-volunteer/${id}`);
                }
                if (context.user.roles === "ROLE_HELP-SEEKER") {
                    navigate(`/profile/${id}`);
                }
            }
            // setFormValue({firstName: '', surname: '', gender: '', birthday: Date, zipCode: ''});
        } catch (e) {
            // toggleError(false);
            if (e.response.status === 400 ) {
                setErrors(e.response.data);
            }
        }
    }


    const {
        firstName: firstNameError,
        surname: surnameError,
        birthday: birthdayError,
        gender: genError,
        zipCode: zipCodeError
    } = errors;

    const onInputChange = (e) => {
        let {name, value} = e.target;
        setErrors((previousErrors) => ({...previousErrors, [name]: undefined}));
        setFormValue({...formValue, [name]: value});
    };



    return (
        <Screen title="Account aanpassen">
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-container__input">
                    <p className="form-__p">Persoonlijke gegevens wijzigen</p>
                    <Input
                        nameRegister="Voornaam"
                        placeholder="voer uw naam in"
                        label="firstName-field"
                        alt="input-firstName"
                        type="text"
                        id={firstName.id}
                        name="firstName"
                        value={firstName}
                        onChange={onInputChange}
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
                        value={surname}
                        onChange={onInputChange}
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
                        value={birthday}
                        onChange={onInputChange}
                        error={birthdayError}
                        required={true}
                    />
                    <label htmlFor="gender-field">
                        <p id="option-box">Ik ben:</p>
                        <select

                            id="gender-field"
                            name="gender"
                            value={gender}
                            onChange={onInputChange}
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
                        value={zipCode}
                        onChange={onInputChange}
                        error={zipCodeError}
                    />
                    <div className="form-container__button">
                        <Button
                            title="register-button"
                            type="submit"
                            // onClick={handleSubmit}
                            disabled={loading}
                        >
                            Updaten
                        </Button>
                    </div>
                </div>
            </form>
        </Screen>
    );
};

export default EditPersonalData;