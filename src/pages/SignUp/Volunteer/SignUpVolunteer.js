import React from 'react';
import axios from 'axios';
import RegistrationForm from '../../../components/Registration/RegistrationForm';
import Screen from '../../../components/UI/Screen/Screen';

const SignUpVolunteer = () => {
    const source = axios.CancelToken.source();

    return (
        <Screen title="Registreren als Vrijwilliger" wide={true}>
            <form className="form-container">
                <h2 className="form-container__title">Registreren als Vrijwilliger</h2>
                <RegistrationForm source={source} apiUrl={"/api/v1/auth/registration/volunteer"}/>
            </form>
        </Screen>
    );
};

export default SignUpVolunteer;