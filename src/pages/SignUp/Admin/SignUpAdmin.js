import React from 'react';
import axios from 'axios';
import Screen from '../../../components/UI/Screen/Screen';
import RegistrationForm from '../../../components/Registration/RegistrationForm';

const SignUpAdmin = () => {
    const source = axios.CancelToken.source();

    return (
        <Screen title="Registratie voor administrator" wide={true}>
            <form className="form-container">
                <h2 className="form-container__title">Registratie voor admin</h2>
                <RegistrationForm source={source} apiUrl={"/api/v1/auth/registration/admin"}/>
            </form>
        </Screen>
    );
};

export default SignUpAdmin;