import React, {useContext, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {AuthContext} from '../../../context/auth-context';
import api from '../../../api/api-calls';
import Screen from '../../../components/UI/Screen/Screen';
import Input from '../../../components/Input/Input';
import Button from '../../../components/UI/Button/Button';
import {MdCancel} from 'react-icons/md';
import '../../../components/Input/InputForm.css'
import './EditData.css'
import DispatchContext from '../../../context/DispatchContext';

let initialState = {
    email: '',
    oldPassword: '',
    newPassword: ''
};

const ChangePassword = () => {
    const {id} = useParams();
    const context = useContext(AuthContext);
    const appDispatch = useContext(DispatchContext);
    const [formValue, setFormValue] = useState(initialState);
    const {email, oldPassword, newPassword} = formValue;
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();
        setErrors('');

        try {

            const changePassword = {...formValue};
            const response = await api.post(`/api/v1/auth/changePassword`,
                changePassword,);
            console.log(response.data);
            if (response.status === 200) {
                setFormValue({
                    email: '',
                    oldPassword: '',
                    newPassword: ''
                });
                if (context.user.roles === "ROLE_VOLUNTEER") {
                    navigate(`/profile-volunteer/${id}`);
                }
                if (context.user.roles === "ROLE_HELP-SEEKER") {
                    navigate(`/profile/${id}`);
                }
            }
            appDispatch({type: "flashMessage", value: "Je wachtwoord is succesvol geüpdatet"});
        } catch (e) {
            // toggleError(false);
            if (e.response.status === 400) {
                setErrors(e.response.data);
            }
        }
    }

    const {
        email: emailError,
        oldPassword: oldPasswordError,
        newPassword: newPasswordError
    } = errors;


    const onChange = (e) => {
        let {name, value} = e.target;
        setErrors((previousErrors) => ({...previousErrors, [name]: undefined}));
        setFormValue({...formValue, [name]: value});
    };


    return (
        <Screen title="Account aanpassen" wide={true}>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-container__input">
                    <p className="form-__p">Je wachtwoord wijzigen</p>
                    <Input
                        nameRegister="Email"
                        placeholder="voer uw email in"
                        label="email-field"
                        alt="input-email"
                        type="text"
                        id={email.id}
                        name="email"
                        value={email}
                        onChange={onChange}
                        error={emailError}
                        autoFocus={true}
                    />
                    <Input
                        nameRegister="Oude wachtwoord"
                        placeholder="kies een wachtwoord"
                        label="Password-field"
                        alt="input-password"
                        autoComplete="false"
                        type="password"
                        id="oldPass"
                        name="oldPassword"
                        value={oldPassword}
                        onChange={onChange}
                        error={oldPasswordError}
                    />
                    <Input
                        nameRegister="Nieuwe wachtwoord"
                        placeholder="kies een nieuwe wachtwoord"
                        label="Password-field"
                        alt="input-password"
                        autoComplete="false"
                        type="password"
                        id="newPass"
                        name="newPassword"
                        value={newPassword}
                        onChange={onChange}
                        error={newPasswordError}
                    />
                    <div id="edit-data__div-buttons">
                        <Button
                            id="edit-data__buttons"
                            title="register-button"
                            type="submit"
                            disabled={!errors}
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

export default ChangePassword;