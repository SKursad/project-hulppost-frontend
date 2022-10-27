import React from 'react';
import axios from 'axios';
import RegistrationForm from '../../../components/Registration/RegistrationForm';
import Screen from '../../../components/UI/Screen/Screen';

const SignUpHelpSeeker = () => {
    const source = axios.CancelToken.source();

    return (
        <Screen title="Registreren als Hulpvrager" wide={true}>
            <form className="form-container">
                <h2 className="form-container__title">Registreren als Hulpvrager</h2>
                <RegistrationForm source={source} apiUrl={"/auth/registration/helpSeeker"}/>
            </form>
        </Screen>
    );
};

export default SignUpHelpSeeker;