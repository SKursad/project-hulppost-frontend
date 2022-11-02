import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import api from '../../../api/api-calls';
import {getToken} from '../../../helper/AccesToken/GetToken';
import Screen from '../../../components/UI/Screen/Screen';
import Input from '../../../components/Input/Input';
import Button from '../../../components/UI/Button/Button';
import RefreshPage from '../../../helper/RefreshPage/RefreshPage';
import '../../../components/Input/InputForm.css'


let initialState = {
    username: '',
    email: '',
};


const EditProfileData = () => {
    const {id} = useParams();
    const [formValue, setFormValue] = useState(initialState);
    const {username, email} = formValue;
    const [errors, setErrors] = useState({});
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        getUserById(id);
    }, [id]);

    const getUserById = async (id) => {
        const userData = await api.get(`/api/v1/users/${id}`, getToken());
        if (userData.status === 200) {
            setFormValue({...userData.data});
            // setIsLoading(false)
            console.log(userData);
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
            const response = await api.put(`/api/v1/users/${id}`,
                updateAccountData, getToken());
            console.log(response.data);
            if (response.status === 200) {
                setFormValue({
                    username: '',
                    email: '',
                });
                RefreshPage(navigate(`/login`));
            }
        } catch (e) {
            if (e.response.status === 400 ) {
                setErrors(e.response.data);
            }
        }
    }


    const {
        username: usernameError,
        email: emailError
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
                    <p className="form-__p">Profiel gegevens wijzigen</p>
                    <Input
                        nameRegister="Gebruikersnaam"
                        // placeholder="voer uw gebruikersnaam in"
                        label="username-field"
                        alt="input-username"
                        type="text"
                        id={username.id}
                        name="username"
                        value={username}
                        onChange={onInputChange}
                        error={usernameError}
                    />
                    <Input
                        nameRegister="Email"
                        // placeholder="voer een geldige email in"
                        // label="email-field"
                        alt="input-email"
                        type="text"
                        id={email.id}
                        name="email"
                        value={email}
                        onChange={onInputChange}
                        error={emailError}
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

export default EditProfileData;