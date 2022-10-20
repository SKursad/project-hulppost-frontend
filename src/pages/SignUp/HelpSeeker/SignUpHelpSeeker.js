import React from 'react';
import axios from 'axios';
import RegistrationForm from '../../../components/Registration/RegistrationForm';
import Screen from '../../../components/UI/Screen/Screen';

const SignUpHelpSeeker = () => {
    const source = axios.CancelToken.source();

    return (
        <Screen title="Registreren als Hulpvrager">
            <h2>Registreren als Hulpvrager</h2>
            <RegistrationForm source={source} apiUrl={"/auth/registration/helpSeeker"}></RegistrationForm>
        </Screen>
    )
};

export default SignUpHelpSeeker;