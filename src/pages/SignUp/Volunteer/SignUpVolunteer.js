import React from 'react';
import axios from 'axios';
import RegistrationForm from '../../../components/Registration/RegistrationForm';
import Screen from '../../../components/UI/Screen/Screen';

const SignUpVolunteer = () => {
    const source = axios.CancelToken.source();

    return (
        <Screen title="Registreren als Vrijwilliger" wide={true}>
            <h2>Registreren als Vrijwilliger</h2>
            <RegistrationForm source={source} apiUrl={"/auth/registration/volunteer"}/>
        </Screen>
    );
};

export default SignUpVolunteer;