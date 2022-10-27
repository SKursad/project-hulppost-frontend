import React from 'react';
import Screen from '../../components/UI/Screen/Screen';
import SignInForm from '../../components/SignIn/SignInForm';


function SignIn() {

    return (
        <Screen title="Inloggen" wide={true}>
            <form className="form-container">
            <h2 className="form-container__title">Inloggen</h2>
            <p> Voer uw gegevens in om te kunnen inloggen </p>
            <SignInForm apiUrl={"/auth/login"}/>
            </form>
        </Screen>
    );
}

export default SignIn;