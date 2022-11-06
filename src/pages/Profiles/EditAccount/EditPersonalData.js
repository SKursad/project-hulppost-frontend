import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getToken} from '../../../helper/AccesToken/GetToken';
import {AuthContext} from '../../../context/auth-context';
import api from '../../../api/api-calls';
import Input from '../../../components/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Screen from '../../../components/UI/Screen/Screen';
import {MdCancel} from 'react-icons/md';
import '../../../components/Input/InputForm.css';
import './EditData.css'
import DispatchContext from '../../../context/DispatchContext';
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
    const context = useContext(AuthContext);
    const appDispatch = useContext(DispatchContext);
    const [formValue, setFormValue] = useState(initialState);
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
            appDispatch({type: "flashMessage", value: "Je profiel is succesvol geüpdatet"});
        } catch (e) {
            // toggleError(false);
            if (e.response.status === 400) {
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
        <Screen title="Account aanpassen" wide={true}>
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
                    <div id="edit-data__div-buttons">
                        <Button
                            id="edit-data__buttons"
                            title="register-button"
                            type="submit"
                            // onClick={handleSubmit}
                            disabled={loading}
                        >
                            Updaten
                        </Button>
                        {context.user.roles === "ROLE_HELP-SEEKER" ? (
                            <Button id="edit-data__buttons" type="button" onClick={() => navigate(`/profile/${id}`)}>ANNULEREN&nbsp;<MdCancel/></Button>
                        ) : (<Button id="edit-data__buttons" type="button" onClick={() => navigate(`/profile-volunteer/${id}`)}>ANNULEREN&nbsp;<MdCancel/></Button>)}
                    </div>
                </div>
            </form>
        </Screen>
    );
};

export default EditPersonalData;