import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import api from '../../../api/api-calls';
import { getToken } from '../../../helper/AccesToken/GetToken';
import Screen from '../../../components/UI/Screen/Screen';
import Input from '../../../components/Input/Input';
import Button from '../../../components/UI/Button/Button';
import RefreshPage from '../../../helper/RefreshPage/RefreshPage';
import '../../../components/Input/InputForm.css';
import { MdCancel } from 'react-icons/md';

const initialState = {
    username: '',
    email: '',
};

const EditProfileData = () => {
    const { id } = useParams();
    const context = useContext(AuthContext);
    const [formValue, setFormValue] = useState(initialState);
    const { username, email } = formValue;
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getUserById(id);
    }, [id]);

    const getUserById = async (id) => {
        try {
            const userData = await api.get(`/api/v1/users/${id}`, getToken());
            if (userData.status === 200) {
                setFormValue({ ...userData.data });
            }
        } catch (e) {
            if (e.response) {
                console.log(e.response.data);
            } else {
                console.log(`Fout: ${e.message}`);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors('');

        try {
            const updateAccountData = { ...formValue };
            const response = await api.put(`/api/v1/users/${id}`, updateAccountData, getToken());

            if (response.status === 200) {
                setFormValue({
                    username: '',
                    email: '',
                });
                RefreshPage(navigate(`/login`));
            }
        } catch (e) {
            if (e.response && e.response.status === 400) {
                setErrors(e.response.data);
            }
        }
    };

    const { username: usernameError, email: emailError } = errors;

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
        setFormValue({ ...formValue, [name]: value });
    };

    return (
        <Screen title="Account aanpassen" wide={true}>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-container__input">
                    <p className="form-__p">Profiel gegevens wijzigen</p>
                    <Input
                        nameRegister="Gebruikersnaam"
                        label="username-field"
                        alt="input-username"
                        type="text"
                        id="username-field"
                        name="username"
                        value={username}
                        onChange={onInputChange}
                        error={usernameError}
                    />
                    <Input
                        nameRegister="Email"
                        alt="input-email"
                        type="text"
                        id="email-field"
                        name="email"
                        value={email}
                        onChange={onInputChange}
                        error={emailError}
                        required={true}
                    />
                    <div id="edit-data__div-buttons">
                        <Button
                            id="edit-data__buttons-3"
                            title="register-button"
                            type="submit"
                        >
                            Updaten
                        </Button>
                        {context.user.roles === "ROLE_HELP-SEEKER" ? (
                            <Button id="edit-data__buttons-1" type="button" onClick={() => navigate(`/profile/${id}`)}>
                                ANNULEREN&nbsp;
                                <MdCancel />
                            </Button>
                        ) : (
                            <Button id="edit-data__buttons-2" type="button" onClick={() => navigate(`/profile-volunteer/${id}`)}>
                                ANNULEREN&nbsp;
                                <MdCancel />
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </Screen>
    );
};

export default EditProfileData;
